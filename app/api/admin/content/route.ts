import { NextResponse } from "next/server";
import { getStoredCmsData, saveStoredCmsData, detectStorageProvider } from "@/lib/cloudStorage";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    if (searchParams.get("status") === "true") {
      const providerInfo = detectStorageProvider();
      return NextResponse.json(
        {
          success: true,
          provider: providerInfo.provider,
          isCloudConnected: providerInfo.isCloudConnected,
        },
        { headers: NO_CACHE_HEADERS }
      );
    }

    const { data, storage } = await getStoredCmsData();

    return NextResponse.json(
      {
        success: true,
        data,
        storage,
        provider: storage.provider,
        isCloudConnected: storage.isCloudConnected,
      },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: e?.message || "Failed to retrieve content" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid payload: Object expected" },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }

    const result = await saveStoredCmsData(body);

    return NextResponse.json(
      {
        success: result.success,
        message: result.success ? "Content saved successfully" : "Partial save occurred",
        storage: result.storage,
        isCloudConnected: result.storage.isCloudConnected,
        error: result.error,
      },
      {
        status: result.success ? 200 : 500,
        headers: NO_CACHE_HEADERS,
      }
    );
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: e?.message || "Failed to update content" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
