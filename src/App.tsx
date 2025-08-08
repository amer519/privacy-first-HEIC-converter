
import React, { useCallback, useMemo, useRef, useState } from "react";
import Dropzone from "./components/Dropzone";
import OptionsPanel from "./components/OptionsPanel";
import FileItem from "./components/FileItem";
import Footer from "./components/Footer";
import { convertMany } from "./utils/convert";

type QueuedFile = {
  id: string;
  file: File;
  status: "queued" | "converting" | "done" | "error";
  progress: number;
  outputBlob?: Blob;
  outputName?: string;
  error?: string;
};

const pageKey = (window as any).__PAGE_KEY || "heic-to-jpg";

const titles: Record<string, string> = {
  "heic-to-jpg": "HEIC to JPG",
  "heic-to-png": "HEIC to PNG",
  "batch-heic-to-jpg": "Batch HEIC to JPG",
  "iphone-heic-to-jpg": "iPhone HEIC to JPG",
  "windows-heic-to-jpg": "Windows HEIC to JPG",
  "mac-heic-to-jpg": "Mac HEIC to JPG",
  "heif-to-jpg": "HEIF to JPG",
  "heic-to-jpeg": "HEIC to JPEG",
  "heic-quality-100": "HEIC to JPG Quality 100",
  "heic-exif-keep": "HEIC metadata basics",
  "heic-to-jpg-no-upload": "HEIC to JPG No Upload",
  "what-is-heic": "What is HEIC"
};

export default function App() {
  const [queue, setQueue] = useState<QueuedFile[]>([]);
  const [format, setFormat] = useState<"image/jpeg" | "image/png">(
    pageKey.includes("png") ? "image/png" : "image/jpeg"
  );
  const [quality, setQuality] = useState<number>(pageKey === "heic-quality-100" ? 1 : 0.92);
  const [maxWidth, setMaxWidth] = useState<number | null>(null);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const onFiles = useCallback((files: File[]) => {
    const items = files
      .filter(f => /heic|heif$/i.test(f.name) || /image\/heic|image\/heif/.test(f.type))
      .map((file, idx) => ({
        id: `${Date.now()}-${idx}-${file.name}`,
        file, status: "queued" as const, progress: 0
      }));
    if (items.length === 0) {
      alert("Drop HEIC or HEIF files");
      return;
    }
    setQueue(prev => [...prev, ...items]);
  }, []);

  const clearQueue = useCallback(() => setQueue([]), []);

  const handleConvert = useCallback(async () => {
    setIsConverting(true);
    try {
      const { results } = await convertMany({
        items: queue,
        format,
        quality,
        maxWidth,
        maxHeight,
        onProgress: (id, p) => {
          setQueue(prev => prev.map(it => it.id === id ? { ...it, progress: p } : it));
        },
        onStatus: (id, status, payload) => {
          setQueue(prev => prev.map(it => it.id === id ? { ...it, status, ...(payload || {}) } : it));
        }
      });
      const success = results.filter(r => r.status === "done").length;
      if (success === 0) {
        alert("No files converted");
      }
    } finally {
      setIsConverting(false);
    }
  }, [queue, format, quality, maxWidth, maxHeight]);

  const haveOutputs = useMemo(() => queue.some(q => q.outputBlob), [queue]);

  return (
    <div className="min-h-screen hero-grad">
      <header className="max-w-5xl mx-auto px-4 pt-10 pb-6">
        <div className="flex items-center gap-3">
          <img src="/favicon.svg" alt="" className="w-8 h-8" />
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{titles[pageKey] || "HEIC Converter"}</h1>
        </div>
        <p className="text-gray-600 mt-2 max-w-3xl">
          Convert HEIC to {format === "image/png" ? "PNG" : "JPG"} locally in your browser. Files never leave your device.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-20 space-y-6">
        <section className="card">
          <Dropzone onFiles={onFiles} />
          <OptionsPanel
            format={format}
            setFormat={setFormat}
            quality={quality}
            setQuality={setQuality}
            maxWidth={maxWidth}
            maxHeight={maxHeight}
            setMaxWidth={setMaxWidth}
            setMaxHeight={setMaxHeight}
            isConverting={isConverting}
            onConvert={handleConvert}
            haveOutputs={haveOutputs}
            queue={queue}
            clearQueue={clearQueue}
          />
        </section>

        {queue.length > 0 && (
          <section className="card">
            <h2 className="text-lg font-semibold mb-4">Files</h2>
            <div className="grid gap-3">
              {queue.map(item => (
                <FileItem key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        <section className="card">
          <h2 className="text-lg font-semibold mb-2">Privacy first</h2>
          <p className="text-sm text-gray-600">
            This tool runs entirely in your browser. There is no server upload. You can go offline and it still works after the first load.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
