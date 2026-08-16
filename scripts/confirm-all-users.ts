// Local-only helper: sweeps every account and confirms any that are stuck
// unconfirmed (e.g. signups from before "Confirm email" was turned off, or
// from when Supabase's rate-limited default email service dropped the
// confirmation email). Usage: npx tsx scripts/confirm-all-users.ts

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(url, serviceKey);

async function main() {
  const { data, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error(listError.message);
    process.exit(1);
  }

  const unconfirmed = data.users.filter((u) => !u.email_confirmed_at);
  if (unconfirmed.length === 0) {
    console.log("No unconfirmed accounts found.");
    return;
  }

  for (const user of unconfirmed) {
    const { error } = await supabase.auth.admin.updateUserById(user.id, {
      email_confirm: true,
    });
    console.log(error ? `Failed: ${user.email} (${error.message})` : `Confirmed: ${user.email}`);
  }
}

main();
