import { NextResponse } from "next/server";
import { getStoredCmsData } from "@/lib/cloudStorage";
import { toPublicCmsData } from "@/lib/publicCms";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const PUBLIC_CMS_CACHE_HEADERS = {
  // Store a local copy, but always validate it before reusing it. This keeps
  // portfolio publishing instant without re-downloading unchanged CMS data.
  "Cache-Control": "private, max-age=0, must-revalidate",
  Vary: "Accept-Encoding",
};

export async function GET(request: Request) {
  try {
    const { data } = await getStoredCmsData();
    const version = String(data._lastModified || 0);
    const etag = `"qllix-cms-${version}"`;

    if (request.headers.get("if-none-match") === etag) {
      return new NextResponse(null, { status: 304, headers: { ...PUBLIC_CMS_CACHE_HEADERS, ETag: etag } });
    }

    return NextResponse.json(
      { success: true, data: toPublicCmsData(data) },
      { headers: { ...PUBLIC_CMS_CACHE_HEADERS, ETag: etag } }
    );
  } catch {
    return NextResponse.json({ success: false, error: "Unable to retrieve content." }, { status: 500 });
  }
}
