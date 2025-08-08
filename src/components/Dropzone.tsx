
import React, { useCallback, useRef, useState } from "react";

export default function Dropzone({ onFiles }: { onFiles: (files: File[]) => void }) {
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setActive(false);
    const files = Array.from(e.dataTransfer.files);
    onFiles(files as File[]);
  }, [onFiles]);

  const onPaste = useCallback((e: React.ClipboardEvent) => {
    const files = Array.from(e.clipboardData.files);
    if (files.length) onFiles(files as File[]);
  }, [onFiles]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setActive(true); }}
      onDragLeave={() => setActive(false)}
      onDrop={onDrop}
      onPaste={onPaste}
      className={`border-2 border-dashed rounded-2xl p-8 text-center transition ${
        active ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-50"
      }`}
    >
      <p className="text-sm text-gray-700">Drag and drop HEIC files here, or</p>
      <button
        type="button"
        className="mt-3 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700"
        onClick={() => inputRef.current?.click()}
      >
        Choose files
      </button>
      <p className="text-xs text-gray-500 mt-3">Tip: You can also paste files from clipboard</p>
      <input
        ref={inputRef}
        type="file"
        accept=".heic,.heif,image/heic,image/heif"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          onFiles(files as File[]);
          e.currentTarget.value = "";
        }}
      />
    </div>
  );
}
