import { cookies } from "next/headers";

import { EditMatchForm } from "@/components/form/editMatchForm";

async function EditMatchPage({ params }: { params: { id: string } }) {
  const id = params.id;

  const res = await fetch(
    `${process.env["NEXT_PUBLIC_ORIGIN"]}/api/matches/${id}`,
    {
      cache: "no-store",
      headers: {
        Cookie: cookies().toString(),
      },
    }
  );
  const matchData = (await res.json()).data;

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
    `${process.env["NEXT_PUBLIC_ORIGIN"]}/api/players`,
    {
      cache: "no-store",
    }
  );
  const playerData = (await playerRes.json()).data;

  return (
    <EditMatchForm
      matchJson={matchData}
      matchMetasJson={matchMetaData}
      playersJson={playerData}
    />
  );
}

export default EditMatchPage;
