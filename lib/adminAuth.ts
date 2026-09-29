import { createHmac, timingSafeEqual } from "crypto";
import { getStoredCmsData, saveStoredCmsData } from "@/lib/cloudStorage";

export const ADMIN_SESSION_COOKIE = "qllix_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 8;

function getAuthConfig() {
  return { passcode: process.env.ADMIN_PASSCODE, sessionSecret: process.env.ADMIN_SESSION_SECRET };
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function hashPasscode(passcode: string) {
  const { sessionSecret } = getAuthConfig();
  if (!sessionSecret) throw new Error("Admin session secret is not configured");
  return sign(`admin-passcode:${passcode}`, sessionSecret);
}

function readCookie(request: Request, name: string) {
  return (request.headers.get("cookie") || "").split(";").map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`))?.slice(name.length + 1);
}

function safelyMatches(value: string, expected: string) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  return valueBuffer.length === expectedBuffer.length && timingSafeEqual(valueBuffer, expectedBuffer);
}

export function isAdminAuthConfigured() {
  const { passcode, sessionSecret } = getAuthConfig();
  return Boolean(passcode && sessionSecret);
}

export async function isValidAdminPasscode(passcode: unknown) {
  if (typeof passcode !== "string") return false;

  const { passcode: configuredPasscode } = getAuthConfig();
  try {
    const { data } = await getStoredCmsData();
    const storedHash = data.general.adminPasscodeHash;
    if (storedHash) return safelyMatches(hashPasscode(passcode), storedHash);
  } catch {
    // The environment passcode remains a safe fallback if CMS storage is temporarily unavailable.
  }

  return typeof configuredPasscode === "string" && safelyMatches(passcode, configuredPasscode);
}

export async function updateAdminPasscode(newPasscode: string) {
  if (newPasscode.length < 8 || newPasscode.length > 256) {
    throw new Error("Use an access code between 8 and 256 characters.");
  }

  const { data } = await getStoredCmsData();
  const result = await saveStoredCmsData({
    ...data,
    general: {
      ...data.general,
      adminPasscode: undefined,
      adminPasscodeHash: hashPasscode(newPasscode),
    },
  });

  if (!result.success) throw new Error(result.error || "Unable to save the new access code.");
}

export function createAdminSession() {
  const { sessionSecret } = getAuthConfig();
  if (!sessionSecret) throw new Error("Admin session secret is not configured");
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_DURATION_MS })).toString("base64url");
  return `${payload}.${sign(payload, sessionSecret)}`;
}

export function isAdminRequestAuthorized(request: Request) {
  const { sessionSecret } = getAuthConfig();
  const token = readCookie(request, ADMIN_SESSION_COOKIE);
  if (!sessionSecret || !token) return false;
  const [payload, signature, ...extra] = token.split(".");
  if (!payload || !signature || extra.length > 0 || !safelyMatches(signature, sign(payload, sessionSecret))) return false;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof session.exp === "number" && session.exp > Date.now();
  } catch { return false; }
}

export const adminSessionCookie = (
  value: string,
  maxAge = Math.floor(SESSION_DURATION_MS / 1000),
  secure = process.env.NODE_ENV === "production"
) => ({
  name: ADMIN_SESSION_COOKIE, value, httpOnly: true, sameSite: "strict" as const,
  secure, path: "/", maxAge,
});