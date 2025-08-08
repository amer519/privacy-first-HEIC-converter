
import heic2any from "heic2any";

type ConvertArgs = {
  items: any[];
  format: "image/jpeg" | "image/png";
  quality: number;
  maxWidth: number | null;
  maxHeight: number | null;
  onProgress: (id: string, p: number) => void;
  onStatus: (id: string, status: any, payload?: any) => void;
};

function targetName(input: File, format: string): string {
  const base = input.name.replace(/\.(heic|heif)$/i, "");
  const ext = format === "image/png" ? "png" : "jpg";
  return `${base}.${ext}`;
}

export async function convertMany(args: ConvertArgs) {
  const { items, format, quality, maxWidth, maxHeight, onProgress, onStatus } = args;
  const results: any[] = [];

  for (const it of items) {
    onStatus(it.id, "converting");
    try {
      const options: any = { 
        toType: format, 
        quality: format === "image/jpeg" ? quality : undefined
      };
      if (maxWidth || maxHeight) {
        options.maxWidth = maxWidth || undefined;
        options.maxHeight = maxHeight || undefined;
      }
      // heic2any does not give per-file progress. We simulate two steps.
      onProgress(it.id, 0.3);
      const outputBlob = await heic2any({ blob: it.file, ...options }) as Blob;
      onProgress(it.id, 0.9);
      const outputName = targetName(it.file, format);
      onStatus(it.id, "done", { outputBlob, outputName, progress: 1 });
      results.push({ id: it.id, status: "done", outputName });
    } catch (e: any) {
      onStatus(it.id, "error", { error: e?.message || "Failed to convert" });
      results.push({ id: it.id, status: "error", error: e?.message });
    }
  }

  return { results };
}
