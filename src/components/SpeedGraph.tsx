import { useEffect, useMemo, useRef, useState } from "react";

interface SpeedGraphProps {
  width?: number;
  height?: number;
  connected: boolean;
}

type Point = { x: number; y: number };

function makePath(points: Point[]) {
  if (!points.length) return "";
  return points.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ");
}

export default function SpeedGraph({ width = 320, height = 80, connected }: SpeedGraphProps) {
  const [down, setDown] = useState<number[]>([]);
  const [up, setUp] = useState<number[]>([]);
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    if (!connected) {
      setDown([]); setUp([]);
      if (tickRef.current) cancelAnimationFrame(tickRef.current);
      return;
    }
    let last = performance.now();
    const rng = () => Math.max(0, (Math.sin(performance.now() / 400) + 1) * 40 + Math.random() * 30);
    const rngUp = () => Math.max(0, (Math.cos(performance.now() / 500) + 1) * 15 + Math.random() * 10);

    const loop = () => {
      const now = performance.now();
      if (now - last > 250) {
        setDown((d) => [...d.slice(-59), rng()]);
        setUp((u) => [...u.slice(-59), rngUp()]);
        last = now;
      }
      tickRef.current = requestAnimationFrame(loop);
    };
    tickRef.current = requestAnimationFrame(loop);
    return () => {
      if (tickRef.current) {
        cancelAnimationFrame(tickRef.current);
      }
    };
  }, [connected]);

  const { downPts, upPts } = useMemo(() => {
    const max = Math.max(60, ...down, ...up);
    const scaleX = (i: number) => (i / 60) * (width - 8) + 4;
    const scaleY = (v: number) => height - 4 - (v / max) * (height - 8);
    const dPts = down.map((v, i) => ({ x: scaleX(i), y: scaleY(v) }));
    const uPts = up.map((v, i) => ({ x: scaleX(i), y: scaleY(v) }));
    return { downPts: dPts, upPts: uPts };
  }, [down, up, width, height]);

  const lastDown = down.at(-1) ?? 0;
  const lastUp = up.at(-1) ?? 0;

  return (
    <div className="w-full bg-gray-900/40 backdrop-blur-md rounded-xl p-4 border border-white/10">
      <div className="flex justify-between text-sm text-gray-300 mb-3 font-medium">
        <span>Download: <span className="text-green-400 font-bold">{lastDown.toFixed(0)} Mbps</span></span>
        <span>Upload: <span className="text-blue-400 font-bold">{lastUp.toFixed(0)} Mbps</span></span>
      </div>
      <svg width={width} height={height} className="bg-black/40 rounded-lg w-full border border-white/10">
        <g opacity={0.3}>
          <line x1="0" y1={height/2} x2={width} y2={height/2} stroke="currentColor" strokeWidth={1} />
          <line x1="0" y1={height-1} x2={width} y2={height-1} stroke="currentColor" strokeWidth={1} />
        </g>
        <path d={makePath(downPts)} fill="none" stroke="currentColor" strokeWidth={2.5} className="text-green-400" strokeLinecap="round" />
        <path d={makePath(upPts)} fill="none" stroke="currentColor" strokeWidth={2.5} className="text-blue-400" strokeLinecap="round" />
      </svg>
    </div>
  );
}
