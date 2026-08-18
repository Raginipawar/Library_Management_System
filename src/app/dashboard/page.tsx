import Link from "next/link";
import { redirect } from "next/navigation";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import { createClient } from "@/lib/supabase/server";
import { getServerSession } from "@/lib/local-auth-server";
import { DbReservation, DbCartItem } from "@/lib/types";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login?redirect=/dashboard");
  }

  const supabase = await createClient();
  const [{ data: reservations }, { data: cartRows }] = await Promise.all([
    supabase
      .from("reservations")
      .select("*, books(*)")
      .eq("user_id", session.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("cart_items")
      .select("*, books(*)")
      .eq("user_id", session.id)
      .order("created_at", { ascending: false })
      .limit(4),
  ]);

  const active = (reservations as DbReservation[] | null)?.filter((r) => r.status === "active") ?? [];
  const waitlisted = (reservations as DbReservation[] | null)?.filter((r) => r.status === "waitlist") ?? [];
  const returned = (reservations as DbReservation[] | null)?.filter((r) => r.status === "returned") ?? [];
  const cartPreview = (cartRows as DbCartItem[] | null) ?? [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-widest text-[var(--color-maroon)] font-semibold mb-1">
          Welcome back
        </p>
        <h1 className="font-display text-4xl font-bold">My Shelf</h1>
      </div>

      {/* ACTIVE RESERVATIONS */}
      <section className="mb-16">
        <h2 className="font-display text-2xl font-bold mb-6">My orders</h2>
        {active.length === 0 ? (
          <p className="text-sm text-current/60">
            Nothing ordered yet. <Link href="/catalog" className="underline underline-offset-4">Browse the catalog</Link>.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {active.map((r) => (
              <div key={r.id} className="glass-panel rounded-2xl p-5 flex gap-4">
                <div
                  className="relative w-16 h-24 rounded-lg shrink-0 overflow-hidden"
                  style={{ backgroundColor: r.books.color }}
                >
                  {r.books.cover_path && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={r.books.cover_path}
                      alt={`${r.books.title} cover`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display font-semibold leading-tight">{r.books.title}</p>
                    <span className="shrink-0 text-[10px] font-semibold px-2 py-1 rounded-full bg-[var(--color-forest)] text-white">
                      Reserved
                    </span>
                  </div>
                  <p className="text-sm text-current/60 mb-3">{r.books.author}</p>
                  <p className="text-xs font-semibold text-[var(--color-forest)]">
                    {r.pickup_slot ? `Pickup: ${r.pickup_slot}` : "Ready for pickup"}
                  </p>
                  <p className="text-[10px] text-current/40 mt-2">
                    Order #{r.id.slice(0, 8).toUpperCase()} · Placed{" "}
                    {new Date(r.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* WAITLIST */}
      {waitlisted.length > 0 && (
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold mb-6">On the waitlist</h2>
          <div className="glass-panel rounded-2xl divide-y divide-current/10">
            {waitlisted.map((r) => (
              <div key={r.id} className="flex items-center gap-4 p-4">
                <div className="w-8 h-11 rounded shrink-0" style={{ backgroundColor: r.books.color }} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{r.books.title}</p>
                  <p className="text-xs text-current/60">{r.books.author}</p>
                  <p className="text-[10px] text-current/40">
                    Order #{r.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>
                <span className="text-xs text-current/50 px-3 py-1 rounded-full bg-[var(--color-mustard)]/30">
                  Waitlisted
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CART PREVIEW */}
      <section className="mb-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-2xl font-bold">In your cart</h2>
          <Link href="/cart" className="text-sm font-semibold underline underline-offset-4">
            View cart →
          </Link>
        </div>
        {cartPreview.length === 0 ? (
          <p className="text-sm text-current/60">Your cart is empty.</p>
        ) : (
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {cartPreview.map((item) => (
              <StaggerItem key={item.id}>
                <Link href={`/books/${item.books.id}`} className="block">
                  <div
                    className="relative overflow-hidden rounded-xl h-40 p-4 flex flex-col justify-between shadow-md hover:-translate-y-1 transition-transform"
                    style={{ backgroundColor: item.books.color }}
                  >
                    {item.books.cover_path && (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.books.cover_path}
                          alt={`${item.books.title} cover`}
                          className="absolute inset-0 w-full h-full object-cover opacity-55"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(to top, ${item.books.color} 15%, transparent 65%)`,
                          }}
                        />
                      </>
                    )}
                    <div className="relative">
                      <p className="text-white font-display text-sm">{item.books.title}</p>
                      <p className="text-white/70 text-xs">{item.books.author}</p>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </section>

      {/* HISTORY */}
      <section>
        <h2 className="font-display text-2xl font-bold mb-6">Order history</h2>
        {returned.length === 0 ? (
          <p className="text-sm text-current/60">No past orders yet.</p>
        ) : (
          <div className="glass-panel rounded-2xl divide-y divide-current/10">
            {returned.map((r) => (
              <div key={r.id} className="flex items-center gap-4 p-4">
                <div className="w-8 h-11 rounded shrink-0" style={{ backgroundColor: r.books.color }} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{r.books.title}</p>
                  <p className="text-xs text-current/60">{r.books.author}</p>
                  <p className="text-[10px] text-current/40">
                    Order #{r.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>
                <span className="text-xs text-current/50 px-3 py-1 rounded-full bg-current/5">
                  Returned
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
