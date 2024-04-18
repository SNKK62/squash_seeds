import { NextRequest } from "next/server";

import { repository } from "@registry/repository";
import { GetMatchMetasByTournamentIdUsecase } from "@usecase/matchMetas/getMatchMetasByTournamentId.usecase";

const getMatchMetasByTournamentIdUsecase =
  new GetMatchMetasByTournamentIdUsecase(repository);

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const tournamentId = searchParams.get("id");
    if (!tournamentId) {
      throw Error("id is required");
    }
    const matchMetas =
      await getMatchMetasByTournamentIdUsecase.execute(tournamentId);
    return Response.json({
      data: matchMetas,
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
