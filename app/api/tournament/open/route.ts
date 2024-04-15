import { repository } from "@registry/repository";
import { GetOpenTournamentUsecase } from "@usecase/tournaments/getOpenTournament.usecase";
import { cookies } from "next/headers";

const getOpenTournamentByRegionUsecase = new GetOpenTournamentUsecase(
  repository
);

export async function GET() {
  try {
    const cookieStore = cookies();
    const email = cookieStore.get("email");
    const password = cookieStore.get("password");
    if (!email || !password) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const tournament = await getOpenTournamentByRegionUsecase.execute(
      email.value,
      password.value
    );
    return Response.json({
      data: tournament,
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
