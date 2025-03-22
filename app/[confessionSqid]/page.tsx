import { redirect } from "next/navigation";
import { getInfluencerBySqid } from "./actions";
import { Suspense } from "react";
import ConfessionFormWrapper from "./confession-form";

const page = async ({
  params,
}: {
  params: Promise<{ confessionSqid: string }>;
}) => {
  const { confessionSqid } = await params;
  if (!confessionSqid) {
    redirect("/");
  }

  const influencer = await getInfluencerBySqid(confessionSqid);
  if (influencer.error) {
    return <div>{influencer.error}</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfessionFormWrapper userId={influencer.data?.user_id} />
    </Suspense>
  );
};

export default page;
