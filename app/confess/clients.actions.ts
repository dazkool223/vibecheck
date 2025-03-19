import { TablesInsert } from "@/utils/database.types";
import { createClient } from "@/utils/supabase/client";

/**
 * Creates a new confession entry in the database.
 *
 * @param userId - The ID of the user creating the confession.
 * @param confessionText - The text content of the confession.
 * @returns A promise that resolves to an object indicating the success or failure of the operation.
 *          - `success`: A boolean indicating whether the confession was created successfully.
 *          - `error`: A string containing an error message if the operation failed, or an empty string if successful.
 */
export const createConfession = async (userId: string, confessionText: string) => {
    const supabase = createClient();
    const confession: TablesInsert<'confession'> = {
        user_id: userId,
        content: confessionText
    }
    const { error } = await supabase
        .from("confession")
        .insert(confession);

    if(error) {
        return {
            success: false,
            error: "Error while creating confession"
        };
    }
    return {
        success: true,
        error: ""
    }
}