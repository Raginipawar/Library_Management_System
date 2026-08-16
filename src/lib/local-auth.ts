"use client";

import { createClient } from "@/lib/supabase/client";

export interface LocalSession {
  id: string;
  email: string;
  fullName: string;
}

const COOKIE_NAME = "mr_session";
const AUTH_EVENT = "mr-auth-change";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeSession(session: LocalSession | null) {
  if (typeof document === "undefined") return;
  document.cookie = session
    ? `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(session))}; path=/; max-age=${60 * 60 * 24 * 365}`
    : `${COOKIE_NAME}=; path=/; max-age=0`;
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function getSession(): LocalSession | null {
  const raw = readCookie(COOKIE_NAME);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LocalSession;
  } catch {
    return null;
  }
}

export function onAuthChange(callback: () => void) {
  window.addEventListener(AUTH_EVENT, callback);
  return () => window.removeEventListener(AUTH_EVENT, callback);
}

export async function signUp(
  email: string,
  password: string,
  fullName: string
): Promise<{ session?: LocalSession; error?: string }> {
  const supabase = createClient();

  const { data: existing } = await supabase
    .from("local_accounts")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  if (existing) {
    return { error: "An account with that email already exists." };
  }

  const { data, error } = await supabase
    .from("local_accounts")
    .insert({ email, password, full_name: fullName })
    .select()
    .single();

  if (error || !data) {
    return { error: error?.message ?? "Could not create account." };
  }

  const session: LocalSession = { id: data.id, email: data.email, fullName: data.full_name };
  writeSession(session);
  return { session };
}

export async function signIn(
  email: string,
  password: string
): Promise<{ session?: LocalSession; error?: string }> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("local_accounts")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .maybeSingle();

  if (error || !data) {
    return { error: "Incorrect email or password." };
  }

  const session: LocalSession = { id: data.id, email: data.email, fullName: data.full_name };
  writeSession(session);
  return { session };
}

export function signOut() {
  writeSession(null);
}
