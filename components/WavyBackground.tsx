"use client";

import { useEffect, useRef } from "react";

type WavyBackgroundProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function WavyBackground({ className, children }: WavyBackgroundProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    let canvas = canvasRef.current;
    if (!wrap) return;

    if (!canvas) {
      canvas = document.createElement("canvas");
      canvasRef.current = canvas;
      canvas.style.position = "absolute";
      canvas.style.setProperty("inset", "0");
      canvas.style.zIndex = "0";
      canvas.style.pointerEvents = "none";
      wrap.appendChild(canvas);
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const palette = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"];

    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect();
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let t = 0;
    const render = () => {
      t += 0.006;
      const { width, height } = wrap.getBoundingClientRect();
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Waves
      const layers = 5;
      ctx.shadowColor = "rgba(120, 220, 255, 0.25)";
      ctx.shadowBlur = 22;
      for (let i = 0; i < layers; i++) {
        const amp = 28 + i * 16;
        const freq = 0.001 + i * 0.0005;
        const speed = 0.5 + i * 0.15;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 6) {
          const y =
            height * 0.5 +
            // primary wave
            Math.sin(x * freq + t * speed + i * 0.6) * amp +
            // secondary modulation to avoid pure lateral slide
            Math.sin((x + Math.sin(t * 0.25 + i) * 60) * freq * 0.6 + t * (speed * 1.2)) * (amp * 0.35) +
            // subtle noise-like component
            Math.cos(x * freq * 0.3 + t * (speed * 0.9) + i) * (amp * 0.18);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        // Gradient stroke across width using palette
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        const c1 = palette[i % palette.length];
        const c2 = palette[(i + 1) % palette.length];
        grad.addColorStop(0, c1);
        grad.addColorStop(1, c2);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 50;
        ctx.stroke();
      }
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <div style={{ position: "relative", zIndex: 10 }}>{children}</div>
    </div>
  );
}
