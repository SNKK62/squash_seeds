import { repository } from "@registry/repository";
import { GetAllPlayersUsecase } from "@usecase/players/getAllPlayers.usecase";

const getAllPlayersUsecase = new GetAllPlayersUsecase(repository);

export async function GET() {
  try {
    const players = await getAllPlayersUsecase.execute({
      retired: false,
    });
    return Response.json({
      data: players,
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
