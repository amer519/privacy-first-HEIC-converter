
import React from "react";

export default function Footer() {
  return (
    <footer className="py-10 border-t mt-10">
      <div className="max-w-5xl mx-auto px-4 text-sm text-gray-600 flex flex-wrap items-center justify-between gap-3">
        <div>© {new Date().getFullYear()} HEIC2JPG Local</div>
        <div className="flex items-center gap-4">
          <a href="/what-is-heic.html">What is HEIC</a>
          <a href="/heic-to-jpg.html">HEIC to JPG</a>
          <a href="/heic-to-png.html">HEIC to PNG</a>
          <a href="/heic-to-jpg-no-upload.html">No upload</a>
        </div>
      </div>
    </footer>
  );
}
