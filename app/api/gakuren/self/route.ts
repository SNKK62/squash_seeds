import { Gakuren } from "@model/gakuren.model";
import { University } from "@model/university.model";
import { repository } from "@registry/repository";
import { GetGakurenSelfUsecase } from "@usecase/gakuren/getGakurenSelf.usecase";
import { cookies } from "next/headers";

const getGakurenSelfUsecase = new GetGakurenSelfUsecase(repository);

export async function GET() {
  const cookieStore = cookies();
  const email = cookieStore.get("email");
  console.log(email);
  try {
    if (!email) {
      throw new Error("Unauthorized");
    }
    console.log(email);
    // const data = await getGakurenSelfUsecase.execute(email.value);
    const university = new University(1, "東京大学", "東大", "関東");
    const data = new Gakuren(
      "aa",
      "田中",
      "太郎",
      2,
      university,
      "普通",
      "関東"
    );
    return Response.json({ data });
  } catch (e) {
    console.error(e);
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
