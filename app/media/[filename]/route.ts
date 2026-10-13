import fs from "fs";
import path from "path";
import { localStorageDirectory } from "@/lib/localCmsStorage";

export const dynamic = "force-dynamic";

const mediaTypes: Record<string, string> = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif", avif: "image/avif", mp4: "video/mp4", webm: "video/webm", mov: "video/quicktime" };

export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  const extension = filename.split(".").pop()?.toLowerCase() || "";
  if (!process.env.QLLIX_STORAGE_DIR || !/^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/.test(filename) || !mediaTypes[extension]) return new Response(null, { status: 404 });
  const file = path.join(localStorageDirectory(), "media", filename);
  try {
    return new Response(fs.readFileSync(file), { headers: { "Content-Type": mediaTypes[extension], "Cache-Control": "public, max-age=86400", "X-Content-Type-Options": "nosniff" } });
  } catch { return new Response(null, { status: 404 }); }
}
