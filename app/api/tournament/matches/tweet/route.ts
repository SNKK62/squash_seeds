import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { repository } from "@registry/repository";
import { LoginUsecase } from "@usecase/auth/login.usecase";
import { TweetMatchesUsecase } from "@usecase/matches/tweetMatches.usecase";

const loginUsecase = new LoginUsecase(repository);
const tweetMatchesUsecase = new TweetMatchesUsecase(repository);

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const email = cookieStore.get("email");
    const password = cookieStore.get("password");
    if (!email || !password) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    // throw "Not implemented";
    await loginUsecase.execute(email.value, password.value);
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await request.json();
    await tweetMatchesUsecase.execute(res.matchIds);
    return Response.json({ data: "OK" }, { status: 200 });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
