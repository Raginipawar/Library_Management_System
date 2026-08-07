import { events } from "@/data/events";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import ReserveButton from "@/components/ReserveButton";

export const metadata = { title: "Events, MindfulReading" };

export default function EventsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-widest text-[var(--color-maroon)] font-semibold mb-1">
          What&apos;s on
        </p>
        <h1 className="font-display text-4xl font-bold">Book clubs & author talks</h1>
      </div>

      <StaggerGrid className="grid gap-5">
        {events.map((e) => {
          const date = new Date(e.date);
          return (
            <StaggerItem key={e.id}>
              <div className="glass-panel rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-5">
                <div
                  className="rounded-xl text-white text-center px-4 py-3 shrink-0 w-20"
                  style={{ backgroundColor: e.color }}
                >
                  <p className="text-[10px] uppercase tracking-widest opacity-80">
                    {date.toLocaleDateString(undefined, { month: "short" })}
                  </p>
                  <p className="text-2xl font-display font-bold leading-none">
                    {date.getDate()}
                  </p>
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-current/50">
                    {e.type}
                  </span>
                  <h3 className="font-display text-lg font-bold">{e.title}</h3>
                  <p className="text-sm text-current/60">{e.description}</p>
                  <p className="text-xs text-current/50 mt-1">
                    {e.time} · {e.seatsLeft} seats left
                  </p>
                </div>
                <ReserveButton className="shrink-0">Reserve seat</ReserveButton>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGrid>
    </div>
  );
}
