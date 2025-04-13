import { TablesInsert } from "@/utils/database.types";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { generateSQID } from "@/utils/utils";

export async function GET(request: Request) {
  // Register User by creating a influencer profile
  const url = new URL(request.url);
  const origin = url.origin;
  const email = url.searchParams.get("email")?.toString();
  const code = url.searchParams.get("code");
  const supabase = await createClient();

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const user = await supabase.auth.getUser();
  const influencer: TablesInsert<"influencer"> = {
    user_id: user?.data.user?.id ?? null,
    sqid: generateSQID(),
  };

  if (email) {
    const { error } = await supabase.from("influencer").insert(influencer);
    if (error) {
      NextResponse.redirect(`${origin}/`);
    }
  }
  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/profile`);
}
