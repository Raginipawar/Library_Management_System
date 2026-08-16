import { cookies } from "next/headers";
import { LocalSession } from "@/lib/local-auth";

export async function getServerSession(): Promise<LocalSession | null> {
  const store = await cookies();
  const raw = store.get("mr_session")?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LocalSession;
  } catch {
    return null;
  }
}
