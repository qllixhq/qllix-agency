import { NextResponse } from "next/server";
import { getStoredCmsData } from "@/lib/cloudStorage";
import { toPublicCmsData } from "@/lib/publicCms";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const { data } = await getStoredCmsData();
    return NextResponse.json(
      { success: true, data: toPublicCmsData(data) },
      { headers: { "Cache-Control": "public, max-age=60, s-maxage=60" } }
    );
  } catch {
    return NextResponse.json({ success: false, error: "Unable to retrieve content." }, { status: 500 });
  }
}
