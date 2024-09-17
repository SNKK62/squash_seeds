import { cookies } from "next/headers";

import { CreateMatchForm } from "@/components/form/createMatchForm";

async function CreateMatchPage() {
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

  const matchMetaRes = await fetch(
    `${process.env["NEXT_PUBLIC_ORIGIN"]}/api/tournaments/${tournamentData.id}/matchMetas`,
    {
      cache: "no-store",
    }
  );
  const matchMetaData = (await matchMetaRes.json()).data;

  const playerRes = await fetch(
    `${process.env["NEXT_PUBLIC_ORIGIN"]}/api/tournaments/${tournamentData.id}/players`,
    {
      cache: "no-store",
    }
  );
  const playerData = (await playerRes.json()).data;

  return (
    <CreateMatchForm matchMetasJson={matchMetaData} playersJson={playerData} />
  );
}

export default CreateMatchPage;
