
import React from "react";

export default function FileItem({ item }: { item: any }) {
  return (
    <div className="flex items-center justify-between gap-4 p-3 rounded-xl border bg-white">
      <div className="min-w-0">
        <div className="font-medium truncate">{item.file.name}</div>
        <div className="text-xs text-gray-600">
          {(item.file.size/1024/1024).toFixed(2)} MB • {item.status}
          {item.status === "converting" && ` • ${Math.round(item.progress*100)}%`}
          {item.error && <span className="text-red-600"> • {item.error}</span>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {item.outputBlob && item.outputName && (
          <a
            className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs hover:bg-green-700"
            href={URL.createObjectURL(item.outputBlob)}
            download={item.outputName}
          >Download</a>
        )}
      </div>
    </div>
  );
}
