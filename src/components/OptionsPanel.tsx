
import React from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";

export default function OptionsPanel(props: {
  format: "image/jpeg" | "image/png";
  setFormat: (v: "image/jpeg" | "image/png") => void;
  quality: number;
  setQuality: (v: number) => void;
  maxWidth: number | null;
  maxHeight: number | null;
  setMaxWidth: (v: number | null) => void;
  setMaxHeight: (v: number | null) => void;
  isConverting: boolean;
  onConvert: () => void;
  haveOutputs: boolean;
  queue: any[];
  clearQueue: () => void;
}) {
  const {
    format, setFormat, quality, setQuality, maxWidth, maxHeight, setMaxWidth, setMaxHeight,
    isConverting, onConvert, haveOutputs, queue, clearQueue
  } = props;

  const downloadAll = async () => {
    const zip = new JSZip();
    let added = 0;
    for (const item of queue) {
      if (item.outputBlob && item.outputName) {
        zip.file(item.outputName, item.outputBlob);
        added++;
      }
    }
    if (added === 0) {
      alert("Nothing to download yet");
      return;
    }
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "converted.zip");
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <label className="font-medium">Output</label>
          <select
            value={format}
            onChange={(e) => props.setFormat(e.target.value as any)}
            className="px-3 py-2 border rounded-xl"
          >
            <option value="image/jpeg">JPG</option>
            <option value="image/png">PNG</option>
          </select>
        </div>

        {format === "image/jpeg" && (
          <div className="flex items-center gap-3">
            <label className="font-medium">Quality</label>
            <input
              type="range"
              min={0.6} max={1} step={0.01}
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-48"
            />
            <span className="text-sm text-gray-600">{Math.round(quality * 100)}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 max-w-sm">
          <div>
            <label className="block text-sm text-gray-600">Max width (px)</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="keep"
              value={maxWidth || ""}
              onChange={(e) => setMaxWidth(e.target.value ? parseInt(e.target.value) : null)}
              className="w-full px-3 py-2 border rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Max height (px)</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="keep"
              value={maxHeight || ""}
              onChange={(e) => setMaxHeight(e.target.value ? parseInt(e.target.value) : null)}
              className="w-full px-3 py-2 border rounded-xl"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={onConvert}
            disabled={isConverting || queue.length === 0}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-60"
          >
            {isConverting ? "Converting..." : "Convert"}
          </button>
          <button
            onClick={downloadAll}
            disabled={!haveOutputs}
            className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm hover:bg-black disabled:opacity-60"
          >
            Download all as zip
          </button>
          <button
            onClick={clearQueue}
            disabled={isConverting || queue.length === 0}
            className="px-4 py-2 rounded-xl bg-gray-200 text-gray-800 text-sm hover:bg-gray-300 disabled:opacity-60"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-600 space-y-2">
        <div className="badge">No upload</div>
        <p>Everything happens on your device. You can even use this offline after the first load.</p>
        <p>JPG is best for photos. PNG is best for graphics and transparency.</p>
        <p>Quality 90 to 95 is a good balance. PNG ignores quality but can increase size.</p>
      </div>
    </div>
  );
}
