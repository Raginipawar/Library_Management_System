"use client";

import HalftoneReveal from "@/components/HalftoneReveal";
import SectionReveal from "@/components/SectionReveal";

export default function HomeHalftoneShowcase() {
  return (
    <SectionReveal bg="#141414">
      <div className="relative w-full h-[520px] sm:h-[600px] overflow-hidden">
        <HalftoneReveal
          src="/images/animation-collage.jpg"
          inkColor="#f4efe4"
          paperColor="#141414"
          mode="mono"
          dotDensity={90}
          angle={28}
          revealRadius={0.3}
          borderRadius="0px"
          style={{ position: "absolute", inset: 0 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(20,20,20,0.9) 0%, rgba(20,20,20,0.6) 32%, transparent 60%)",
          }}
        />
        <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col justify-center pointer-events-none">
          <div className="max-w-md">
            <p className="text-xs uppercase tracking-widest text-[var(--color-mustard)] font-semibold mb-1">
              Look closer
            </p>
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              There&apos;s more here than it looks.
            </h2>
            <p className="text-white/70">
              Move your cursor over the print. It&apos;s an old darkroom trick,
              rows of halftone dots that sharpen into a real photograph
              wherever the light lands.
            </p>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
