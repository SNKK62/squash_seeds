import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { repository } from "@registry/repository";
import { LoginUsecase } from "@usecase/auth/login.usecase";
import { MarkMatchesAsAnnouncedUsecase } from "@usecase/matches/markMatchesAsAnnounced.usecase";

const loginUsecase = new LoginUsecase(repository);
const markMatchesAsAnnouncedUsecase = new MarkMatchesAsAnnouncedUsecase(
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
    const res = await request.json();
    await markMatchesAsAnnouncedUsecase.execute(res.matchIds);
    return Response.json({ data: "OK" }, { status: 200 });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
