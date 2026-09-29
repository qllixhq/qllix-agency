import { NextResponse } from "next/server";
import {
  adminSessionCookie,
  createAdminSession,
  isAdminAuthConfigured,
  isAdminRequestAuthorized,
  isValidAdminPasscode,
  updateAdminPasscode,
} from "@/lib/adminAuth";

const NO_CACHE_HEADERS = { "Cache-Control": "no-store, no-cache, must-revalidate", Pragma: "no-cache" };

export async function GET(request: Request) {
  return NextResponse.json(
    { authenticated: isAdminRequestAuthorized(request), configured: isAdminAuthConfigured() },
    { headers: NO_CACHE_HEADERS }
  );
}

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { success: false, error: "Admin authentication is not configured." },
      { status: 503, headers: NO_CACHE_HEADERS }
    );
  }

  try {
    const { passcode } = await request.json();
    if (typeof passcode !== "string" || passcode.length > 256 || !(await isValidAdminPasscode(passcode))) {
      return NextResponse.json({ success: false, error: "Invalid access code." }, { status: 401, headers: NO_CACHE_HEADERS });
    }

    const response = NextResponse.json({ success: true }, { headers: NO_CACHE_HEADERS });
    const usesHttps = new URL(request.url).protocol === "https:" || request.headers.get("x-forwarded-proto") === "https";
    response.cookies.set(adminSessionCookie(createAdminSession(), undefined, usesHttps));
    return response;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400, headers: NO_CACHE_HEADERS });
  }
}

export async function PATCH(request: Request) {
  if (!isAdminRequestAuthorized(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401, headers: NO_CACHE_HEADERS });
  }

  try {
    const { newPasscode } = await request.json();
    if (typeof newPasscode !== "string") {
      return NextResponse.json({ success: false, error: "Enter a valid access code." }, { status: 400, headers: NO_CACHE_HEADERS });
    }
    await updateAdminPasscode(newPasscode.trim());
    return NextResponse.json({ success: true, message: "Access code updated." }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update access code.";
    return NextResponse.json({ success: false, error: message }, { status: 400, headers: NO_CACHE_HEADERS });
  }
}

export function DELETE() {
  const response = NextResponse.json({ success: true }, { headers: NO_CACHE_HEADERS });
  response.cookies.set(adminSessionCookie("", 0));
  return response;
}