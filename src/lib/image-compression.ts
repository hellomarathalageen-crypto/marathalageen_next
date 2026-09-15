/**
 * High-performance client-side image compression utility
 * Compresses camera uploads (5MB - 15MB) to lightweight WebP/JPEG (~100KB - 200KB)
 * directly in the user browser before network transmission.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  mimeType?: "image/webp" | "image/jpeg" | "image/png";
}

export interface CompressedResult {
  file: File;
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  savedPercent: number;
  width: number;
  height: number;
}

export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<CompressedResult> {
  const {
    maxWidth = 1200,
    maxHeight = 1200,
    quality = 0.82,
    mimeType = "image/webp",
  } = options;

  return new Promise((resolve, reject) => {
    // If it is not an image, reject
    if (!file.type.startsWith("image/")) {
      return reject(new Error("Selected file is not an image."));
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio preserved dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return reject(new Error("Failed to get 2D canvas context for compression."));
        }

        // Apply smooth bilinear scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Fallback to jpeg if browser does not support webp canvas export
        let exportMime = mimeType;
        try {
          const testData = canvas.toDataURL("image/webp");
          if (!testData.startsWith("data:image/webp")) {
            exportMime = "image/jpeg";
          }
        } catch {
          exportMime = "image/jpeg";
        }

        const dataUrl = canvas.toDataURL(exportMime, quality);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error("Canvas to Blob conversion failed."));
            }

            const extension = exportMime === "image/webp" ? ".webp" : ".jpg";
            const newFileName = file.name.replace(/\.[^/.]+$/, "") + extension;
            const compressedFile = new File([blob], newFileName, {
              type: exportMime,
              lastModified: Date.now(),
            });

            const originalSize = file.size;
            const compressedSize = compressedFile.size;
            const savedPercent = Math.max(
              0,
              Math.round(((originalSize - compressedSize) / originalSize) * 100)
            );

            resolve({
              file: compressedFile,
              dataUrl,
              originalSize,
              compressedSize,
              savedPercent,
              width,
              height,
            });
          },
          exportMime,
          quality
        );
      };

      img.onerror = () => {
        reject(new Error("Failed to load image for compression."));
      };
    };

    reader.onerror = () => {
      reject(new Error("Failed to read image file."));
    };
  });
}
