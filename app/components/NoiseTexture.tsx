export default function NoiseTexture() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] h-full w-full opacity-[0.03] dark:opacity-[0.04] mix-blend-overlay">
      <svg className="absolute inset-0 h-full w-full">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
