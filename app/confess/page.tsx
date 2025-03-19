import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getInfluencerById } from "./actions";
import ConfessionFormWrapper from "./confession-form";

interface SearchParams {
  userId: string;
}

const Confess = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { userId } = await searchParams;
  if (!userId) {
    redirect("/");
  }

  const influencer = await getInfluencerById(userId);
  if (!influencer.exists) {
    return <div>{influencer.error}</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfessionFormWrapper userId={userId} />
    </Suspense>
  );
};
export default Confess;
