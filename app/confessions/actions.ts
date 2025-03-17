'use server'
import { createClient } from "@/utils/supabase/server";

export const getConfessionsByUserId = async (userId: string, page = 1 , pageSize = 10 ) => {
    const supabase = await createClient();
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    console.log(userId)
    const { data, error, count } = await supabase
        .from("confession")
        .select("*", { count: "exact" })
        .eq("user_id", userId)
        .range(start, end)
        .order('created_at', { ascending: false })
    if (error) {
        throw error;
    }
    return { data, count }
}