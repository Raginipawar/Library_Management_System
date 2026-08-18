import Link from "next/link";
import LampHero from "@/components/LampHero";
import SectionReveal from "@/components/SectionReveal";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import BookCard from "@/components/BookCard";
import WalkingCharacter from "@/components/WalkingCharacter";
import ReserveButton from "@/components/ReserveButton";
import HomeHalftoneShowcase from "@/components/HomeHalftoneShowcase";
import { categories } from "@/data/categories";
import { testimonials } from "@/data/testimonials";
import { createClient } from "@/lib/supabase/server";
import { DbBook } from "@/lib/types";

const steps = [
  {
    title: "Search",
    text: "Browse the catalog by genre, author, or vibe. Filter to what's actually on the shelf.",
  },
  {
    title: "Reserve",
    text: "Pick a copy or a seat, choose a pickup slot, and lock it in, no phone calls required.",
  },
  {
    title: "Pick up",
    text: "Swing by, grab your book, and get a nudge before it's due back.",
  },
];

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("books")
    .select("*")
    .eq("is_new", true)
    .limit(4);
  const newArrivals: DbBook[] = data ?? [];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--color-cream)] pb-16">
        <div className="absolute inset-x-0 top-0 h-[520px] pointer-events-none overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-gradient.jpg"
            alt=""
            className="w-full h-full object-cover opacity-80"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 35%, var(--color-cream) 100%)",
            }}
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <LampHero />
          <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05] mt-6">
            Reading is how
            <br />
            ideas <span className="text-[var(--color-maroon)]">travel.</span>
          </h1>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/catalog">
              <ReserveButton>Browse Books</ReserveButton>
            </Link>
            <Link href="/events">
              <ReserveButton variant="ghost">Reserve a Seat</ReserveButton>
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <SectionReveal className="py-20" bg="var(--color-forest)">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-white mb-8">
            Find your next shelf
          </h2>
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {categories.map((c) => (
              <StaggerItem key={c.slug}>
                <Link
                  href={`/catalog?genre=${encodeURIComponent(c.name)}`}
                  className="group block"
                >
                  <div
                    className="relative overflow-hidden rounded-2xl p-6 h-44 flex flex-col justify-end transition-transform duration-300 group-hover:-translate-y-2 group-hover:-rotate-2 shadow-lg"
                    style={{ backgroundColor: c.color }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.image}
                      alt={`${c.name} shelf`}
                      className="absolute inset-0 w-full h-full object-cover opacity-45 transition-opacity duration-300 group-hover:opacity-60"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top, ${c.color} 10%, transparent 75%)`,
                      }}
                    />
                    <div className="relative">
                      <p className="text-white font-display font-semibold drop-shadow">{c.name}</p>
                      <p className="text-white/80 text-xs drop-shadow">{c.description}</p>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </SectionReveal>

      {/* HALFTONE SHOWCASE — dark theme only */}
      <HomeHalftoneShowcase />

      {/* NEW ARRIVALS */}
      <SectionReveal className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--color-maroon)] font-semibold mb-1">
              Fresh off the shelf
            </p>
            <h2 className="font-display text-3xl font-bold">New Arrivals</h2>
          </div>
          <Link href="/catalog" className="text-sm font-semibold underline underline-offset-4">
            See all →
          </Link>
        </div>
        <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {newArrivals.map((b) => (
            <StaggerItem key={b.id}>
              <BookCard book={b} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </SectionReveal>

      {/* HOW IT WORKS */}
      <SectionReveal className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl font-bold mb-4 text-center">How it works</h2>
        <p className="text-center text-current/70 mb-12">
          Three steps between you and your next great read.
        </p>
        <div className="space-y-10">
          {steps.map((s, i) => (
            <WalkingCharacter
              key={s.title}
              message={`${s.title}, ${s.text}`}
              color={
                i === 0
                  ? "var(--color-cobalt)"
                  : i === 1
                  ? "var(--color-burnt)"
                  : "var(--color-forest)"
              }
            />
          ))}
        </div>
      </SectionReveal>

      {/* TESTIMONIALS */}
      <SectionReveal className="py-20" bg="var(--color-mustard)">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold mb-8 text-[#1c1712]">
            What members are saying
          </h2>
          <StaggerGrid className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <div className="glass-panel rounded-2xl p-6 h-full flex flex-col justify-between">
                  <p className="text-sm text-[#1c1712]/90 mb-4">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full"
                      style={{ backgroundColor: t.color }}
                    />
                    <div>
                      <p className="font-semibold text-sm text-[#1c1712]">{t.name}</p>
                      <p className="text-xs text-[#1c1712]/60">{t.role}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </SectionReveal>
    </>
  );
}
