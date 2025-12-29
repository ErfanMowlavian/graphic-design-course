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
          src="https://images.steamusercontent.com/ugc/862852298937140849/E33E1E045FCCC35DF0CECFB7C7E853CD19CCDA34/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <DvdText
          text="استاد تورو خدا نمره بده ساعت 3 نصف شبه"
          className="absolute inset-0 z-10 pointer-events-none"
          textClassName="select-none text-white/90 text-base md:text-xl lg:text-2xl"
        />
      </section>
    </main>
  );
}
