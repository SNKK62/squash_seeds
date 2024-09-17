import { NextRequest } from "next/server";

import { repository } from "@registry/repository";
import { GetAllPlayersByTournamentIdUsecase } from "@usecase/players/getAllPlayersByTournamentId.usecase";

const getAllPlayersByTournamentIdUsecase =
  new GetAllPlayersByTournamentIdUsecase(repository);

export async function GET(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    const tournamentId = pathname.split("/")[3];
    if (!tournamentId) {
      throw Error("id is required");
    }
    const matchMetas =
      await getAllPlayersByTournamentIdUsecase.execute(tournamentId);
    return Response.json({
      data: matchMetas,
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
