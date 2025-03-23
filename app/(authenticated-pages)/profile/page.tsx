import { Card, CardContent } from "@/components/ui/card";
import { Link, Share } from "lucide-react";
import { getUser } from "@/utils/supabase/user";
import { redirect } from "next/navigation";
import CopyLinkButton from "@/components/ui/copy-button";

const Profile = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const confessionLink = `${process.env.NEXT_HOST}/confess?userId=${user.id}`;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto w-full">
        {/* Header */}
        <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Here's your confessions link
        </h1>

        {/* Link Card */}
        <Card className="mb-4 bg-white">
          <CardContent className="p-4 flex items-center justify-center">
            <p className="text-gray-700 text-center">{confessionLink}</p>
          </CardContent>
        </Card>

        {/* Copy Link Button */}
        <CopyLinkButton content={confessionLink} />

        {/* Steps Cards */}
        <Card className="mb-4 bg-white">
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 text-blue-600">
              <Link size={24} />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Step-1</p>
              <p className="text-gray-600">copy above link</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 text-blue-600">
              <Share size={24} />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Step-2</p>
              <p className="text-gray-600">Share link on your social media</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
