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
  const h = 70;
  const amp = 18;
  const mid = h * 0.45;

  const buildWavePath = (startX: number) => {
    const s = waveWidth / 6;
    return [
      `C${startX + s * 0.5},${mid - amp} ${startX + s},${mid - amp} ${startX + s * 1.5},${mid}`,
      `C${startX + s * 2},${mid + amp} ${startX + s * 2.5},${mid + amp} ${startX + s * 3},${mid}`,
      `C${startX + s * 3.5},${mid - amp} ${startX + s * 4},${mid - amp} ${startX + s * 4.5},${mid}`,
      `C${startX + s * 5},${mid + amp} ${startX + s * 5.5},${mid + amp} ${startX + s * 6},${mid}`,
    ].join(" ");
  };

  const fillPath = `M0,${mid} ${buildWavePath(0)} ${buildWavePath(waveWidth)} L${totalWidth},${h} L0,${h} Z`;
  const strokePath = `M0,${mid} ${buildWavePath(0)} ${buildWavePath(waveWidth)}`;

  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] ${className}`}
      style={{
        marginTop: "-1px",
        marginBottom: "-1px",
        background: topColor,
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
              <stop offset="0%" stopColor="#d4a853" stopOpacity="0.3" />
              <stop offset="25%" stopColor="#e8c97a" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#fff" stopOpacity="1" />
              <stop offset="75%" stopColor="#e8c97a" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#d4a853" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* Fill area below wave */}
          <path d={fillPath} fill={bottomColor} />
          {/* Gold stroke on the wave line - thicker and more visible */}
          <path
            d={strokePath}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="2.5"
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  );
}
