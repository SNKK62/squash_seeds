import { repository } from "@registry/repository";
import { GetMatchMetasByTournamentIdUsecase } from "@usecase/matchMetas/getMatchMetasByTournamentId.usecase";
import { NextApiRequest } from "next";

const getMatchMetasByTournamentIdUsecase =
  new GetMatchMetasByTournamentIdUsecase(repository);

export async function GET(req: NextApiRequest) {
  try {
    const { id: tournamentId } = req.body;
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
