import { cookies } from "next/headers";

import { repository } from "@registry/repository";
import { GetGakurenSelfUsecase } from "@usecase/gakuren/getGakurenSelf.usecase";

const getGakurenSelfUsecase = new GetGakurenSelfUsecase(repository);

export async function GET() {
  try {
    const cookieStore = cookies();
    const email = cookieStore.get("email");
    const password = cookieStore.get("password");
    if (!email || !password) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const gakurenWithAuthData = await getGakurenSelfUsecase.execute(
      email.value,
      password.value
    );
    console.log(gakurenWithAuthData);
    return Response.json({ data: gakurenWithAuthData.gakuren });
  } catch (e) {
    console.error(e);
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
