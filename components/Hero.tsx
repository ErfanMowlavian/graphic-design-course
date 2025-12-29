"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Sparkles from "./Sparkles";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headline = headlineRef.current;
      if (headline) {
        const text = headline.innerText;
        headline.innerHTML = "";
        const words = text.split(" ").map((word) => {
          const span = document.createElement("span");
          span.innerText = word + " ";
          span.style.display = "inline-block";
          span.style.opacity = "0";
          span.style.transform = "translateY(80px)";
          headline.appendChild(span);
          return span;
        });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(words, {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.05,
        })
          .fromTo(
            subtextRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1 },
            "-=1"
          )
          .fromTo(
            buttonRef.current,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 1 },
            "-=0.8"
          );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 md:px-12 lg:px-24 overflow-hidden bg-black"
    >
      <Sparkles className="absolute inset-0 pointer-events-none mix-blend-screen opacity-75" intensity={100} />
      <div className="relative mx-auto max-w-5xl text-center">
        <h1
          ref={headlineRef}
          className="relative z-10 text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl"
        >
          طراحی گرافیک را حرفه‌ای بیاموزید
        </h1>
        <p
          ref={subtextRef}
          className="mt-8 mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl lg:text-2xl"
        >
          دوره‌ای جامع برای تسلط بر اصول طراحی، تایپوگرافی و ترکیب‌بندی.
          از مبانی تا خلق آثار هنری خیره‌کننده، همراه با پروژه‌های واقعی.
        </p>
        <div className="mt-12">
          <button
            ref={buttonRef}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-medium text-black transition-transform hover:scale-105"
          >
            <span>شروع یادگیری</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
