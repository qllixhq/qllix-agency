/**
 * High-performance client-side image compressor & optimizer.
 * Resizes large images (camera photos, high-res screenshots) to clean web dimensions
 * and compresses to lightweight WebP/JPEG data URLs (typically 20KB - 80KB).
 * Prevents LocalStorage quota overflow and API payload size limits.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  mimeType?: "image/webp" | "image/jpeg" | "image/png";
}

export async function compressImageFile(
  file: File,
  options: CompressionOptions = {}
): Promise<string> {
  const {
    maxWidth = 1400,
    maxHeight = 1400,
    quality = 0.82,
    mimeType = "image/webp",
  } = options;

  return new Promise((resolve, reject) => {
    // If it's not an image (e.g. video or SVG), or SVG which is vector
    if (!file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
      return;
    }

    if (file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (!src) {
        reject(new Error("Failed to read image file"));
        return;
      }

      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        // Calculate aspect ratio scale
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          // Fallback to original
          resolve(src);
          return;
        }

        // Better image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Try preferred format (WebP is smaller and supported in 99.5% of modern browsers)
        try {
          const compressedDataUrl = canvas.toDataURL(mimeType, quality);
          // If browser didn't support webp, it falls back to png which might be big, so check jpeg
          if (mimeType === "image/webp" && compressedDataUrl.startsWith("data:image/png")) {
            resolve(canvas.toDataURL("image/jpeg", quality));
          } else {
            resolve(compressedDataUrl);
          }
        } catch {
          resolve(canvas.toDataURL("image/jpeg", quality));
        }
      };

      img.onerror = () => {
        // Fallback to raw data url if Image loading fails
        resolve(src);
      };

      img.src = src;
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Optimizes an existing base64 data URL if it is larger than threshold
 */
export async function optimizeDataUrl(
  dataUrl: string,
  options: CompressionOptions = {}
): Promise<string> {
  if (!dataUrl || !dataUrl.startsWith("data:image/")) return dataUrl;
  // If smaller than 50KB, no need to compress
  if (dataUrl.length < 70000 && !dataUrl.startsWith("data:image/png")) return dataUrl;

  const {
    maxWidth = 1400,
    maxHeight = 1400,
    quality = 0.82,
    mimeType = "image/webp",
  } = options;

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(dataUrl);
        return;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      try {
        const res = canvas.toDataURL(mimeType, quality);
        resolve(res);
      } catch {
        resolve(canvas.toDataURL("image/jpeg", quality));
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}
