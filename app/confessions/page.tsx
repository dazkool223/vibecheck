import { getUser } from "@/utils/supabase/user";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Confessions = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }
  return <div>Confessions</div>;
};

export default Confessions;
