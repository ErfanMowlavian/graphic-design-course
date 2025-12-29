"use client";

import { useEffect, useRef } from "react";

type DvdTextProps = {
  text: string;
  className?: string;
};

export default function DvdText({ text, className }: DvdTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const item = itemRef.current;
    if (!container || !item) return;

    let x = 20;
    let y = 20;
    let vx = 180;
    let vy = 140;
    let last = performance.now();

    const palette = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee", "#22c55e", "#f59e0b"];
    let colorIndex = 0;

    const setPos = (nx: number, ny: number) => {
      if (item) {
        item.style.transform = `translate(${Math.round(nx)}px, ${Math.round(ny)}px)`;
      }
    };

    const tick = (now: number) => {
      const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
      last = now;

      const rect = container.getBoundingClientRect();
      const iw = item.offsetWidth;
      const ih = item.offsetHeight;
      const maxX = rect.width - iw;
      const maxY = rect.height - ih;

      x += vx * dt;
      y += vy * dt;

      let bounced = false;
      if (x <= 0) {
        x = 0;
        vx = Math.abs(vx);
        bounced = true;
      } else if (x >= maxX) {
        x = maxX;
        vx = -Math.abs(vx);
        bounced = true;
      }
      if (y <= 0) {
        y = 0;
        vy = Math.abs(vy);
        bounced = true;
      } else if (y >= maxY) {
        y = maxY;
        vy = -Math.abs(vy);
        bounced = true;
      }

      if (bounced) {
        colorIndex = (colorIndex + 1) % palette.length;
        item.style.color = palette[colorIndex];
      }

      setPos(x, y);
      rafRef.current = requestAnimationFrame(tick);
    };

    const onResize = () => {
      const rect = container.getBoundingClientRect();
      const iw = item.offsetWidth;
      const ih = item.offsetHeight;
      x = Math.min(x, Math.max(0, rect.width - iw));
      y = Math.min(y, Math.max(0, rect.height - ih));
      setPos(x, y);
    };

    setPos(x, y);
    item.style.willChange = "transform";
    item.style.color = palette[colorIndex];

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ position: "absolute", inset: 0 }}>
      <div
        ref={itemRef}
        style={{ position: "absolute", left: 0, top: 0, transform: "translate(0px, 0px)" }}
        className="select-none text-white/90 text-2xl md:text-3xl lg:text-4xl"
      >
        {text}
      </div>
    </div>
  );
}

