import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "qllix_admin_session";

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(normalized + padding);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function encodeBase64Url(bytes: ArrayBuffer) {
  let binary = "";
  new Uint8Array(bytes).forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hasValidAdminSession(request: NextRequest) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!secret || !token) return false;

  const [payload, signature, ...extra] = token.split(".");
  if (!payload || !signature || extra.length > 0) return false;

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const expectedSignature = encodeBase64Url(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload)));
    if (signature !== expectedSignature) return false;

    const { exp } = JSON.parse(new TextDecoder().decode(decodeBase64Url(payload)));
    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminApi = pathname.startsWith("/api/admin/");
  const isContentApi = pathname === "/api/admin/content";
  const authenticated = await hasValidAdminSession(request);

  // The public frontend already requests the old CMS route. Serve a redacted data set
  // rather than exposing orders, leads, or admin configuration to that request.
  if (isContentApi && request.method === "GET" && !authenticated) {
    return NextResponse.rewrite(new URL("/api/content", request.url));
  }

  if (isAdminApi) {
    if (pathname === "/api/admin/auth") return NextResponse.next();
    if (!authenticated) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const contentLength = Number(request.headers.get("content-length") || "0");
    if (pathname === "/api/admin/upload" && contentLength > 6 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "Image upload exceeds the 5 MB limit." }, { status: 413 });
    }
    return NextResponse.next();
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (authenticated) return NextResponse.next();
    const loginUrl = new URL("/admin-login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
