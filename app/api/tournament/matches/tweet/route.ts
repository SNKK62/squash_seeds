import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { repository } from "@registry/repository";
import { LoginUsecase } from "@usecase/auth/login.usecase";
import { TweetMatchesUsecase } from "@usecase/matches/tweetMatches.usecase";
import { GetOpenTournamentUsecase } from "@usecase/tournaments/getOpenTournament.usecase";

const loginUsecase = new LoginUsecase(repository);
const tweetMatchesUsecase = new TweetMatchesUsecase(repository);
const getOpenTournamentByRegionUsecase = new GetOpenTournamentUsecase(
  repository
);

export async function POST(request: NextRequest) {
  // TODO: refine type
  let emailStr: string;
  let passwordStr: string;
  try {
    const cookieStore = cookies();
    const email = cookieStore.get("email");
    const password = cookieStore.get("password");
    if (!email || !password) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    // throw "Not implemented";
    emailStr = email.value;
    passwordStr = password.value;
    await loginUsecase.execute(emailStr, passwordStr);
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // fetch open tournament to check region
    const tournament = await getOpenTournamentByRegionUsecase.execute(
      emailStr,
      passwordStr
    );
    const res = await request.json();
    await tweetMatchesUsecase.execute(
      res.matchIds,
      tournament.region === "全日本"
    );
    return Response.json({ data: "OK" }, { status: 200 });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
