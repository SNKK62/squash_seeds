import { cookies } from "next/headers";

import AnnounceMatchesForm from "@/components/form/announceMatchesForm";

async function ListMatchesNotAnnouncedPage() {
  const res = await fetch(
    `${process.env["NEXT_PUBLIC_ORIGIN"]}/api/tournament/matches`,
    {
      cache: "no-store",
      headers: {
        Cookie: cookies().toString(),
      },
    }
  );
  const data = (await res.json()).data;
  console.log(data);

  return <AnnounceMatchesForm matchesJson={data} />;
}

export default ListMatchesNotAnnouncedPage;
