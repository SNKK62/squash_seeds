import { cookies } from "next/headers";

import AnnounceMatchesForm from "@/components/form/announceMatchesForm";

import { Gakuren } from "@model/gakuren.model";
import { Tournament } from "@model/tournament.model";

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

  const tournamentRes = await fetch(
    `${process.env["NEXT_PUBLIC_ORIGIN"]}/api/tournament/open`,
    {
      cache: "no-store",
      headers: {
        Cookie: cookies().toString(),
      },
    }
  );
  const tournamentData = (await tournamentRes.json()).data;
  const tournament = Tournament.fromJSON(tournamentData);

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

  return (
    <AnnounceMatchesForm
      matchesJson={data}
      role={self.role}
      isTeam={tournament.isTeam}
    />
  );
}

export default ListMatchesNotAnnouncedPage;
