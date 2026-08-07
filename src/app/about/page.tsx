import WalkingCharacter from "@/components/WalkingCharacter";
import SectionReveal from "@/components/SectionReveal";

export const metadata = { title: "About, MindfulReading" };

const values = [
  { title: "Open access", text: "Every card is free. Every shelf is public.", color: "var(--color-forest)" },
  { title: "Community first", text: "We're built around book clubs, workshops and story time, not just checkouts.", color: "var(--color-burnt)" },
  { title: "No banned books", text: "We keep challenged titles on the shelf, on purpose.", color: "var(--color-maroon)" },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-widest text-[var(--color-maroon)] font-semibold mb-1">
          Our library
        </p>
        <h1 className="font-display text-4xl font-bold mb-4">
          Reading is how ideas travel.
        </h1>
        <p className="text-current/70 max-w-xl mx-auto">
          MindfulReading started as a single reading room and a rolling cart of
          donated paperbacks. Today it&apos;s a full community library, still
          run on the belief that a good book, at the right time, can change
          a life.
        </p>
      </div>

      <SectionReveal className="space-y-8">
        {values.map((v) => (
          <WalkingCharacter key={v.title} message={`${v.title}, ${v.text}`} color={v.color} />
        ))}
      </SectionReveal>

      <SectionReveal className="mt-20">
        <div className="glass-panel rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start">
          <div
            className="w-16 h-16 rounded-full shrink-0 grid place-items-center text-white font-display text-2xl"
            style={{ backgroundColor: "var(--color-burnt)" }}
          >
            R
          </div>
          <div>
            <p className="text-current/80 leading-relaxed italic mb-3">
              &ldquo;I took over the front desk here twelve years ago because a
              librarian let me read past closing time when I had nowhere else
              to go. Every system we&apos;ve built since, the reservations, the
              waitlists, the seat booking, exists so the next kid doesn&apos;t
              have to ask twice.&rdquo;
            </p>
            <p className="text-sm font-semibold">Reema Kulkarni</p>
            <p className="text-xs text-current/60">Head Librarian, MindfulReading</p>
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}
