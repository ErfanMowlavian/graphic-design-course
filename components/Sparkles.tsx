"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type SparklesProps = {
  className?: string;
  intensity?: number; // number of particles
};

export default function Sparkles({ className, intensity = 60 }: SparklesProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const isRTL = typeof document !== "undefined" && document?.dir === "rtl";

    const rect = wrap.getBoundingClientRect();
    const count = intensity;
    particlesRef.current = [];
    wrap.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.style.position = "absolute";
      p.style.left = `${Math.random() * rect.width}px`;
      p.style.top = `${Math.random() * rect.height}px`;
      p.style.width = `${Math.random() * 2 + 1}px`;
      p.style.height = p.style.width;
      p.style.borderRadius = "9999px";
      p.style.pointerEvents = "none";
      p.style.background =
        "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0) 100%)";
      p.style.filter = "drop-shadow(0 0 6px rgba(255,255,255,0.35))";
      p.style.opacity = "0";
      p.style.transform = "translate3d(0,0,0) scale(0.8)";
      wrap.appendChild(p);
      particlesRef.current.push(p);
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    particlesRef.current.forEach((el, idx) => {
      const driftX = (isRTL ? 1 : -1) * (Math.random() * 18 + 6);
      const driftY = -(Math.random() * 22 + 8);
      tl.to(
        el,
        {
          opacity: gsap.utils.random(0.7, 1),
          scale: gsap.utils.random(0.9, 1.3),
          x: `+=${driftX}`,
          y: `+=${driftY}`,
          duration: gsap.utils.random(0.9, 1.6),
          repeat: -1,
          yoyo: true,
          repeatDelay: gsap.utils.random(0.3, 1),
        },
        idx * 0.015
      );
    });

    const onResize = () => {
      const r = wrap.getBoundingClientRect();
      particlesRef.current.forEach((el) => {
        const nx = Math.min(parseFloat(el.style.left), r.width - 2);
        const ny = Math.min(parseFloat(el.style.top), r.height - 2);
        el.style.left = `${nx}px`;
        el.style.top = `${ny}px`;
      });
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      tl.kill();
    };
  }, [intensity]);

  return (
    <div
      ref={wrapRef}
      className={className}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
}
