// components/media-frame.js
// Unified media slot: renders next/image when a real photo is provided,
// otherwise a branded navy/gold blueprint placeholder (no external tooling needed).
// Swap a placeholder for a photo by setting `src` — nothing else changes.
import NextImage from "next/image";

const RATIOS = {
  "16/9": "16 / 9",
  "2/1": "2 / 1",
  "4/3": "4 / 3",
  "3/2": "3 / 2",
  "1/1": "1 / 1",
};

export default function Media({
  src,
  alt = "",
  label,
  hint,
  ratio = "4/3",
  tone = "dark",
  priority = false,
  sizes = "100vw",
  rounded = false,
  className = "",
  imgClassName = "object-cover",
  children,
}) {
  const aspectRatio = ratio ? RATIOS[ratio] ?? RATIOS["4/3"] : undefined;
  return (
    <div
      className={`relative overflow-hidden bg-secondary-bg ${rounded ? "rounded-xl" : ""} ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {src ? (
        <NextImage
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={imgClassName}
        />
      ) : (
        <MediaPlaceholder label={label} hint={hint} tone={tone} />
      )}
      {children}
    </div>
  );
}

// Blueprint-style placeholder. Pure flat SVG (no defs/ids) so multiple
// instances can coexist without duplicate DOM ids.
function MediaPlaceholder({ label, hint, tone }) {
  const dark = tone !== "light";
  const bg = dark ? "#0A1730" : "#F4F6F9";
  const line = dark ? "#22345A" : "#E0E0E0";
  const ink = dark ? "#FFFFFF" : "#1A1A1A";
  const muted = dark ? "rgba(255,255,255,0.55)" : "rgba(26,26,26,0.5)";
  const gold = "#C6A24B";

  const verticals = Array.from({ length: 9 }, (_, i) => (i + 1) * 120);
  const horizontals = Array.from({ length: 6 }, (_, i) => (i + 1) * 120);

  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label={label ? `Image placeholder: ${label}` : "Image placeholder"}
    >
      <rect width="1200" height="900" fill={bg} />
      {verticals.map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="900" stroke={line} strokeWidth="1" />
      ))}
      {horizontals.map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="1200" y2={y} stroke={line} strokeWidth="1" />
      ))}

      {/* corner brackets */}
      <path d="M48 148V48h100" fill="none" stroke={gold} strokeWidth="4" />
      <path d="M1052 48h100v100" fill="none" stroke={gold} strokeWidth="4" />
      <path d="M1152 752v100h-100" fill="none" stroke={gold} strokeWidth="4" />
      <path d="M148 852H48V752" fill="none" stroke={gold} strokeWidth="4" />

      {label && (
        <text
          x="600"
          y="450"
          textAnchor="middle"
          fill={ink}
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="48"
          fontWeight="600"
        >
          {label}
        </text>
      )}
      {hint && (
        <text
          x="600"
          y="510"
          textAnchor="middle"
          fill={muted}
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="26"
        >
          {hint}
        </text>
      )}
      <text
        x="600"
        y="820"
        textAnchor="middle"
        fill={muted}
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="20"
        letterSpacing="6"
      >
        ADMILL · IMAGE PENDING
      </text>
    </svg>
  );
}
