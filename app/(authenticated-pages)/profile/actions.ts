import { createClient } from "@/utils/supabase/server"

export const getSqidForUserId = async (userId: string) => {
    const supabase = await createClient();
    const {data} = await supabase
    .from("influencer")
    .select("sqid")
    .eq("user_id", userId)
    .single()
    return data?.sqid
}