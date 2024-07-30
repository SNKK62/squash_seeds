import { cookies } from "next/headers";

import { repository } from "@registry/repository";
import { LoginUsecase } from "@usecase/auth/login.usecase";

const loginUsecase = new LoginUsecase(repository);

export async function GET() {
  try {
    const cookieStore = cookies();
    const email = cookieStore.get("email");
    const password = cookieStore.get("password");
    if (!email || !password) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const gakuren = await loginUsecase.execute(email.value, password.value);
    return Response.json({
      data: gakuren,
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
