import { getUser } from "@/utils/supabase/user";
import { redirect } from "next/navigation";
import { getConfessionsByUserId } from "./actions";
import { Card, CardContent } from "@/components/ui/card";
import { PostgrestError } from "@supabase/supabase-js";

const Confessions = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }
  try {
    const { data, count } = await getConfessionsByUserId(user.id);
    return (
      <main className="flex-1 p-4">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">confessions</h2>
          <span className="text-sm text-gray-500">{count} confession</span>
        </div>
        {data.length === 0 ? (
          <p>You haven't received any confessions yet.</p>
        ) : (
          <div className="space-y-3">
            {data.map((item, index) => (
              <Card key={index} className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <p className="text-gray-700">~ {item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    );
  } catch (error) {
    const postgrestError = error as PostgrestError;
    return (
      <p> error while fetching confessions due to {postgrestError.message}</p>
    );
  }
};

export default Confessions;
