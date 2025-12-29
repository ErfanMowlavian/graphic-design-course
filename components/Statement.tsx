"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WavyBackground from "./WavyBackground";

export default function Statement() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out", // Softer ease for emotional feel
            scrollTrigger: {
              trigger: containerRef.current,
              start: "center 70%",
              end: "center 30%",
              toggleActions: "play none none reverse", // Or just play once
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[80vh] w-full items-center justify-center px-6 py-24 text-center md:px-12 overflow-hidden"
    >
      <WavyBackground className="absolute inset-0 -z-10 pointer-events-none">
        <div />
      </WavyBackground>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", zIndex: 5 }}
      />
      <h2
        ref={textRef}
        className="relative z-10 max-w-5xl text-4xl font-light leading-snug text-white md:text-6xl lg:text-7xl"
      >
        <span className="block text-zinc-400">طراحی تزیین نیست.</span>
        <span className="block mt-4 text-white">طراحی ارتباط است.</span>
      </h2>
    </section>
  );
}
