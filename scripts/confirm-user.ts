// Local-only helper: manually confirms a specific user's email via the
// admin API, for when Supabase's confirmation email is slow/missing in
// spam during local testing. Usage: npx tsx scripts/confirm-user.ts <email>

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const email = process.argv[2];

if (!email) {
  console.error("Usage: npx tsx scripts/confirm-user.ts <email>");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

async function main() {
  const { data, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error(listError.message);
    process.exit(1);
  }

  const user = data.users.find((u) => u.email === email);
  if (!user) {
    console.error(`No account found for ${email}`);
    process.exit(1);
  }

  const { error } = await supabase.auth.admin.updateUserById(user.id, {
    email_confirm: true,
  });

  if (error) {
    console.error(error.message);
    process.exit(1);
  }

  console.log(`Confirmed: ${email}`);
}

main();
