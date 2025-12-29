import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Statement from "@/components/Statement";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-zinc-950">
      <Hero />
      <Statement />
      <Features />
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <img
          src="/ostad.gif"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Top-left overlay text */}
        <div className="absolute top-6 left-6 z-10">
          <p className="text-white/90 text-2xl md:text-3xl lg:text-4xl">
            استاد تورو خدا نمره بده ساعت 3 نصف شبه
          </p>
        </div>
      </section>
    </main>
  );
}
