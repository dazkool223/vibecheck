import { checkUserPresent } from "./actions";
import { createClient } from "@/utils/supabase/server";

jest.mock("@/utils/supabase/server", () => ({
    createClient: jest.fn(),
}));

describe("checkUserPresent", () => {
    let mockSupabase: any;

    beforeEach(() => {
        mockSupabase = {
            auth: {
                admin: {
                    getUserById: jest.fn(),
                },
            },
        };
        (createClient as jest.Mock).mockResolvedValue(mockSupabase);
    });

    it("should return an error if userId is not provided", async () => {
        const result = await checkUserPresent("");
        expect(result).toEqual({
            exists: false,
            error: "User ID is required",
        });
    });

    it("should return an error if there is an error fetching the user", async () => {
        mockSupabase.auth.admin.getUserById.mockResolvedValue({
            data: null,
            error: "Some error",
        });

        const result = await checkUserPresent("test-user-id");
        expect(result).toEqual({
            exists: false,
            error: "Error while fetching Influencer",
        });
    });

    it("should return an error if the user does not exist", async () => {
        mockSupabase.auth.admin.getUserById.mockResolvedValue({
            data: { user: null },
            error: null,
        });

        const result = await checkUserPresent("test-user-id");
        expect(result).toEqual({
            exists: false,
            error: "Link you are trying to access is invalid. Maybe ask the influencer to share the correct link!",
        });
    });

    it("should return exists: true if the user exists", async () => {
        mockSupabase.auth.admin.getUserById.mockResolvedValue({
            data: { user: { id: "test-user-id" } },
            error: null,
        });

        const result = await checkUserPresent("test-user-id");
        expect(result).toEqual({
            exists: true,
            error: "",
        });
    });
});