import { repository } from "@registry/repository";
import { GetOpenMatchMetasUsecase } from "@usecase/matchMetas/getOpenMatchMetas.usecase";
import { cookies } from "next/headers";

const getOpenMatchMetasUsecase = new GetOpenMatchMetasUsecase(repository);

export async function GET() {
  try {
    const cookieStore = cookies();
    const email = cookieStore.get("email");
    const password = cookieStore.get("password");
    if (!email || !password) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const matchMetas = await getOpenMatchMetasUsecase.execute(
      email.value,
      password.value
    );
    return Response.json({
      data: matchMetas,
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
