"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

export default function Features() {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const features = [
    { id: "01", title: "اصول تایپوگرافی", desc: "هنر چیدمان حروف" },
    { id: "02", title: "لی‌اوت و گریدبندی", desc: "نظم در بی‌نظمی" },
    { id: "03", title: "تئوری رنگ", desc: "روانشناسی رنگ‌ها" },
    { id: "04", title: "پروژه‌های واقعی", desc: "تجربه عملی" },
    { id: "05", title: "مهارت‌های بازار کار", desc: "آماده برای استخدام" },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item) return;
        
        gsap.fromTo(
          item,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <section
      ref={containerRef}
      className="flex min-h-screen flex-col justify-center px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="flex flex-col gap-16 md:gap-24">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={addToRefs}
            className={clsx(
              "group flex flex-col border-b border-white/10 pb-8 transition-colors hover:border-white/30 md:flex-row md:items-baseline md:gap-12"
            )}
          >
            <span className="mb-4 text-sm font-light text-zinc-500 md:mb-0 md:text-base">
              {feature.id}
            </span>
            <div className="flex flex-col">
              <h2 className="text-3xl font-medium text-white md:text-5xl lg:text-6xl">
                {feature.title}
              </h2>
              <p className="mt-2 text-lg text-zinc-400 md:mt-4 md:text-xl">
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
