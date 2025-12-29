import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Statement from "@/components/Statement";
import DvdText from "@/components/DvdText";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-zinc-950">
      <Hero />
      <Statement />
      <Features />
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <img
          src="ostad.gif"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <DvdText
          text="استاد تورو خدا نمره بده ساعت 3 نصف شبه"
          className="absolute inset-0 z-10 pointer-events-none"
        />
      </section>
    </main>
  );
}
