import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { saveUploadToBlob } from "@/lib/blobCmsStorage";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let buffer: Buffer | null = null;
    let extension = "jpg";
    let filename = `team-${Date.now()}`;

    // 1. Handle FormData upload
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);

      if (file.name) {
        const ext = path.extname(file.name).replace(".", "").toLowerCase();
        if (ext) extension = ext;
        filename = `${path.basename(file.name, path.extname(file.name)).replace(/[^a-zA-Z0-9_-]/g, "_")}-${Date.now()}`;
      }
    }
    // 2. Handle JSON base64 upload
    else if (contentType.includes("application/json")) {
      const body = await request.json();
      const dataUrl = body.image || body.dataUrl || "";

      if (!dataUrl) {
        return NextResponse.json({ success: false, error: "No image data provided" }, { status: 400 });
      }

      const matches = dataUrl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        if (mimeType.includes("png")) extension = "png";
        else if (mimeType.includes("webp")) extension = "webp";
        else extension = "jpg";

        buffer = Buffer.from(matches[2], "base64");
      } else {
        return NextResponse.json({ success: false, error: "Invalid base64 data" }, { status: 400 });
      }

      if (body.filename) {
        filename = `${body.filename.replace(/[^a-zA-Z0-9_-]/g, "_")}-${Date.now()}`;
      }
    } else {
      return NextResponse.json({ success: false, error: "Unsupported Content-Type" }, { status: 400 });
    }

    if (!buffer) {
      return NextResponse.json({ success: false, error: "Failed to read image buffer" }, { status: 400 });
    }

    const fullFileName = `${filename}.${extension}`;
    const mime = extension === "png" ? "image/png" : extension === "webp" ? "image/webp" : "image/jpeg";

    // Vercel Blob keeps uploaded images persistent and prevents base64 CMS bloat.
    const blob = await saveUploadToBlob(buffer, fullFileName, mime);
    if (blob) {
      return NextResponse.json({ success: true, url: blob.url, message: "Image saved securely to cloud storage" });
    }

    // A. Local / Node.js filesystem write
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads", "team");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fullFileName);
      fs.writeFileSync(filePath, buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/team/${fullFileName}`,
        message: "Image saved successfully to uploads",
      });
    } catch (fsErr) {
      // In read-only serverless environment (e.g. Vercel without persistent disk)
      // Return as optimized data URI so it still functions immediately
      const mime = extension === "png" ? "image/png" : extension === "webp" ? "image/webp" : "image/jpeg";
      const dataUri = `data:${mime};base64,${buffer.toString("base64")}`;

      return NextResponse.json({
        success: true,
        url: dataUri,
        message: "Optimized image processed",
      });
    }
  } catch (err: any) {
    console.error("[Upload API] Error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Image upload failed" },
      { status: 500 }
    );
  }
}
