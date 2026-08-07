// Local-only helper: creates (or resets) a pre-confirmed test account so
// we can verify the auth + cart + reservation flow without needing to
// click a real confirmation email. Never run this against a real/prod
// user base outside of local development.

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(url, serviceKey);

const email = "e2e-test@pageturn.local";
const password = "TestPassword123!";

async function main() {
  const { data: existing } = await supabase.auth.admin.listUsers();
  const found = existing.users.find((u) => u.email === email);

  if (found) {
    await supabase.auth.admin.updateUserById(found.id, {
      password,
      email_confirm: true,
    });
    console.log("Reset existing test user:", email);
  } else {
    const { error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: "Test Reader" },
    });
    if (error) {
      console.error(error.message);
      process.exit(1);
    }
    console.log("Created test user:", email);
  }
}

main();
