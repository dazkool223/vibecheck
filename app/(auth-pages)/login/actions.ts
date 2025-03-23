"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";



export const signinWithMagicLink = async (email:any) => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOtp({
    email
  })

  if (error) {
    console.log('error', error)

    return {
      success: null,
      error: error.message,
    }
  }
  console.log(data)
  return {
    success: 'Please check your email',
    error: null,
  }
}

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};
