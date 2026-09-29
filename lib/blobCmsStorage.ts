import { list, put } from "@vercel/blob";
import { createHash } from "crypto";
import type { CmsData } from "./cmsStore";

const STORE_ID = process.env.QLLIX_MEDIA_STORE_ID;
const DATA_IMAGE_PATTERN = /^data:(image\/[a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=\s]+)$/;

function imageExtension(mime: string) {
  if (mime === "image/svg+xml") return "svg";
  if (mime === "image/jpeg") return "jpg";
  return mime.split("/")[1]?.replace(/[^a-z0-9]/gi, "") || "png";
}

function collectDataImages(value: unknown, output = new Set<string>()) {
  if (typeof value === "string" && DATA_IMAGE_PATTERN.test(value)) output.add(value);
  else if (Array.isArray(value)) value.forEach((item) => collectDataImages(item, output));
  else if (value && typeof value === "object") Object.values(value).forEach((item) => collectDataImages(item, output));
  return output;
}

async function uploadDataImage(dataUri: string) {
  const match = dataUri.match(DATA_IMAGE_PATTERN);
  if (!match || !STORE_ID) return dataUri;
  const mime = match[1];
  const buffer = Buffer.from(match[2].replace(/\s/g, ""), "base64");
  const hash = createHash("sha256").update(buffer).digest("hex");
  const blob = await put(`cms/media/${hash}.${imageExtension(mime)}`, buffer, {
    access: "public", addRandomSuffix: false, allowOverwrite: true, contentType: mime, storeId: STORE_ID,
  });
  return blob.url;
}

function replaceDataImages(value: unknown, urls: Map<string, string>): unknown {
  if (typeof value === "string") return urls.get(value) || value;
  if (Array.isArray(value)) return value.map((item) => replaceDataImages(item, urls));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, replaceDataImages(item, urls)]));
  return value;
}

export function isBlobCmsConfigured() {
  return Boolean(STORE_ID);
}

export async function loadCmsFromBlob(): Promise<CmsData | null> {
  if (!STORE_ID) return null;
  const { blobs } = await list({ prefix: "cms/current.json", storeId: STORE_ID });
  const current = blobs.find((blob) => blob.pathname === "cms/current.json");
  if (!current) return null;
  const response = await fetch(current.url, { cache: "no-store" });
  if (!response.ok) throw new Error(`CMS Blob returned ${response.status}`);
  return (await response.json()) as CmsData;
}

export async function saveCmsToBlob(data: CmsData): Promise<CmsData> {
  if (!STORE_ID) throw new Error("Vercel Blob storage is not configured");
  const sourceImages = [...collectDataImages(data)];
  const uploadedUrls = new Map<string, string>();
  for (let index = 0; index < sourceImages.length; index += 4) {
    const batch = sourceImages.slice(index, index + 4);
    const results = await Promise.all(batch.map(uploadDataImage));
    batch.forEach((source, resultIndex) => uploadedUrls.set(source, results[resultIndex]));
  }
  const compactData = replaceDataImages(data, uploadedUrls) as CmsData;
  await put("cms/current.json", JSON.stringify(compactData), {
    access: "public", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json", storeId: STORE_ID,
  });
  return compactData;
}

export async function saveUploadToBlob(buffer: Buffer, pathname: string, contentType: string) {
  if (!STORE_ID) return null;
  return put(`uploads/${pathname}`, buffer, {
    access: "public", addRandomSuffix: false, contentType, storeId: STORE_ID,
  });
}