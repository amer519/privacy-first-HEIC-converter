import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        "heic-to-jpg": resolve(__dirname, "heic-to-jpg.html"),
        "heic-to-png": resolve(__dirname, "heic-to-png.html"),
        "batch-heic-to-jpg": resolve(__dirname, "batch-heic-to-jpg.html"),
        "iphone-heic-to-jpg": resolve(__dirname, "iphone-heic-to-jpg.html"),
        "windows-heic-to-jpg": resolve(__dirname, "windows-heic-to-jpg.html"),
        "mac-heic-to-jpg": resolve(__dirname, "mac-heic-to-jpg.html"),
        "heif-to-jpg": resolve(__dirname, "heif-to-jpg.html"),
        "heic-to-jpeg": resolve(__dirname, "heic-to-jpeg.html"),
        "heic-quality-100": resolve(__dirname, "heic-quality-100.html"),
        "heic-exif-keep": resolve(__dirname, "heic-exif-keep.html"),
        "heic-to-jpg-no-upload": resolve(__dirname, "heic-to-jpg-no-upload.html"),
        "what-is-heic": resolve(__dirname, "what-is-heic.html"),
      },
    },
  },
});