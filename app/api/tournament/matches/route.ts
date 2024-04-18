import { cookies } from "next/headers";

import { repository } from "@registry/repository";
import { GetAllMatchesNotAnnouncedUsecase } from "@usecase/matches/getAllMatchesNotAnnounced.usecase";

const getAllMatchesNotAnnouncedUsecase = new GetAllMatchesNotAnnouncedUsecase(
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
    const matches = await getAllMatchesNotAnnouncedUsecase.execute(
      email.value,
      password.value
    );
    return Response.json({
      data: matches,
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
