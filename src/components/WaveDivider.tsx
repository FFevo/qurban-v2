"use client";

import { useId } from "react";

interface WaveDividerProps {
  topColor: string;
  bottomColor: string;
  className?: string;
}

export default function WaveDivider({
  topColor,
  bottomColor,
  className = "",
}: WaveDividerProps) {
  const uid = useId().replace(/:/g, "");
  const gradId = `goldGrad_${uid}`;

  const waveWidth = 600;
  const totalWidth = waveWidth * 2;
  const h = 80;
  const amp = 16;
  const mid = h * 0.5;

  const buildWavePath = (startX: number) => {
    const s = waveWidth / 6;
    return [
      `C${startX + s * 0.5},${mid - amp} ${startX + s},${mid - amp} ${startX + s * 1.5},${mid}`,
      `C${startX + s * 2},${mid + amp} ${startX + s * 2.5},${mid + amp} ${startX + s * 3},${mid}`,
      `C${startX + s * 3.5},${mid - amp} ${startX + s * 4},${mid - amp} ${startX + s * 4.5},${mid}`,
      `C${startX + s * 5},${mid + amp} ${startX + s * 5.5},${mid + amp} ${startX + s * 6},${mid}`,
    ].join(" ");
  };

  // Top fill: from top edge down to wave line
  const topFillPath = `M0,0 L${totalWidth},0 L${totalWidth},${mid} ${buildWavePathReverse(waveWidth)} ${buildWavePathReverse(0)} Z`;
  // Bottom fill: from wave line down to bottom edge
  const bottomFillPath = `M0,${mid} ${buildWavePath(0)} ${buildWavePath(waveWidth)} L${totalWidth},${h} L0,${h} Z`;
  // Stroke path: just the wave line
  const strokePath = `M0,${mid} ${buildWavePath(0)} ${buildWavePath(waveWidth)}`;

  function buildWavePathReverse(startX: number) {
    const s = waveWidth / 6;
    const endX = startX + waveWidth;
    return [
      `C${endX - s * 0.5},${mid + amp} ${endX - s},${mid + amp} ${endX - s * 1.5},${mid}`,
      `C${endX - s * 2},${mid - amp} ${endX - s * 2.5},${mid - amp} ${endX - s * 3},${mid}`,
      `C${endX - s * 3.5},${mid + amp} ${endX - s * 4},${mid + amp} ${endX - s * 4.5},${mid}`,
      `C${endX - s * 5},${mid - amp} ${endX - s * 5.5},${mid - amp} ${endX - s * 6},${mid}`,
    ].join(" ");
  }

  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] ${className}`}
      style={{
        marginTop: "-2px",
        marginBottom: "-2px",
      }}
      aria-hidden="true"
    >
      <div
        className="w-[200%]"
        style={{
          animation: "wave-drift 5s linear infinite",
        }}
      >
        <svg
          viewBox={`0 0 ${totalWidth} ${h}`}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full h-[50px] sm:h-[60px] md:h-[70px]"
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d4a853" stopOpacity="0.2" />
              <stop offset="25%" stopColor="#e8c97a" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#fff" stopOpacity="1" />
              <stop offset="75%" stopColor="#e8c97a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d4a853" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Top area: topColor */}
          <path d={topFillPath} fill={topColor} />
          {/* Bottom area: bottomColor */}
          <path d={bottomFillPath} fill={bottomColor} />
          {/* Gold stroke on the wave line */}
          <path
            d={strokePath}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="2"
            opacity="0.7"
          />
        </svg>
      </div>
    </div>
  );
}
