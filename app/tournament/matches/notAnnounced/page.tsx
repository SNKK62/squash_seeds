import { cookies } from "next/headers";

import AnnounceMatchesForm from "@/components/form/announceMatchesForm";

import { Gakuren } from "@model/gakuren.model";

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

  const selfRes = await fetch(
    `${process.env["NEXT_PUBLIC_ORIGIN"]}/api/gakuren/self`,
    {
      cache: "no-store",
      headers: {
        Cookie: cookies().toString(),
      },
    }
  );
  const selfData = (await selfRes.json()).data;
  const self = Gakuren.fromJSON(selfData);

  return <AnnounceMatchesForm matchesJson={data} role={self.role} />;
}

export default ListMatchesNotAnnouncedPage;
