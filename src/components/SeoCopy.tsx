import React from "react";

const LinkStrip = () => (
  <div className="flex flex-wrap gap-2 mb-4">
    <a href="/heic-to-jpg" className="badge">HEIC → JPG</a>
    <a href="/heic-to-png" className="badge">HEIC → PNG</a>
    <a href="/heic-to-jpg-no-upload" className="badge">No upload</a>
    <a href="/what-is-heic" className="badge">What is HEIC?</a>
  </div>
);

const copy: Record<string, React.ReactNode> = {
  "heic-to-jpg": (
    <div>
      <LinkStrip />
      <h2>Free <a href="/heic-to-jpg">HEIC to JPG</a> converter</h2>
      <p>Drop your HEIC photos and get clean JPGs that work everywhere. Runs in your browser, no uploads.</p>
      <h3>Why convert HEIC to JPG</h3>
      <ul>
        <li>Share to older apps that don’t accept HEIC</li>
        <li>Smaller files with wide compatibility</li>
        <li>Fix rotation by normalizing orientation</li>
      </ul>
      <h3>FAQ</h3>
      <p><strong>Do my photos upload?</strong> No, everything runs locally.</p>
      <p><strong>Is metadata kept?</strong> Most EXIF is stripped for privacy.</p>
    </div>
  ),
  "heic-to-png": (
    <div>
      <LinkStrip />
      <h2><a href="/heic-to-png">HEIC to PNG</a></h2>
      <p>PNG keeps crisp edges/transparency. For photos, JPG is usually smaller.</p>
    </div>
  ),
  "batch-heic-to-jpg": (
    <div>
      <LinkStrip />
      <h2>Batch convert many HEIC files</h2>
      <p>Convert dozens at once and download a single zip.</p>
    </div>
  ),
  "iphone-heic-to-jpg": (
    <div>
      <LinkStrip />
      <h2>iPhone HEIC to JPG</h2>
      <p>AirDropped HEIC? Export as JPG here.</p>
    </div>
  ),
  "windows-heic-to-jpg": (
    <div>
      <LinkStrip />
      <h2>Windows HEIC to JPG</h2>
      <p>Drop HEICs and download standard JPGs.</p>
    </div>
  ),
  "mac-heic-to-jpg": (
    <div>
      <LinkStrip />
      <h2>Mac HEIC to JPG</h2>
      <p>Works offline after first load.</p>
    </div>
  ),
  "heif-to-jpg": (
    <div>
      <LinkStrip />
      <h2>HEIF to JPG</h2>
      <p>HEIF or HEIC both convert locally.</p>
    </div>
  ),
  "heic-to-jpeg": (
    <div>
      <LinkStrip />
      <h2>HEIC to JPEG</h2>
      <p>JPEG = JPG. Use quality to tune size vs clarity.</p>
    </div>
  ),
  "heic-quality-100": (
    <div>
      <LinkStrip />
      <h2>Maximum quality export</h2>
      <p>Quality 100 is largest; 90–95 is usually ideal.</p>
    </div>
  ),
  "heic-exif-keep": (
    <div>
      <LinkStrip />
      <h2>Metadata & privacy</h2>
      <p>EXIF (incl. GPS) is removed; orientation is preserved.</p>
    </div>
  ),
  "heic-to-jpg-no-upload": (
    <div>
      <LinkStrip />
      <h2>No upload conversion</h2>
      <p>Faster and safer for sensitive photos.</p>
    </div>
  ),
  "what-is-heic": (
    <div>
      <LinkStrip />
      <h2>What is <a href="/what-is-heic">HEIC</a>?</h2>
      <p>High-efficiency images; great size/quality, but JPG is still most compatible.</p>
    </div>
  )
};

export default function SeoCopy({ pageKey }: { pageKey: string }) {
  const content = copy[pageKey];
  if (!content) return null;
  return <section className="card prose prose-sm max-w-none">{content}</section>;
}