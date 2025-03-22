import { Tables } from "@/utils/database.types";
import { createClient as createServerClient } from "@/utils/supabase/server";

type GenericResponse<T> = {
    error: string | null;
    data: T | null;
};

/**
 * Checks if a user is present in the system by their user ID.
 *
 * @param userId - The unique identifier of the user to check.
 * @returns A promise that resolves to an object containing:
 * - `exists`: A boolean indicating whether the user exists.
 * - `error`: A string describing any error that occurred or an empty string if no error.
 *
 * @remarks
 * - If the `sqid` is not provided, the function returns an error indicating that the user ID is required.
 * - If there is an error while fetching the user, it returns an error message.
 * - If the user does not exist, it returns an error message suggesting the link might be invalid.
 * - If the user exists, it returns `exists: true` with no error.
 *
 * @throws This function does not throw exceptions but returns error messages in the response object.
 */


export const getInfluencerBySqid = async (sqid: string): Promise<GenericResponse<Tables<'influencer'>>> => {
    if (!sqid) {
        return {
            error: "sqid is required",
            data: null
        };
    }

    const supabase = await createServerClient();
    const { data, error } = await supabase
        .from("influencer")
        .select("*")
        .eq("sqid", sqid) as { data: Tables<'influencer'> | null, error: any };

    if (error) {
        return {
            error: `Error while fetching Influencer: ${error.message}`,
            data: null
        };
    }

    if (!data || data.length === 0) {
        return {
            error: "Link you are trying to access is invalid. Maybe ask the influencer to share the correct link!",
            data: null
        };
    }

    return {
        error: null,
        data: data
    };
};

