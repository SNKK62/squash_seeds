import { NextRequest } from "next/server";

import { repository } from "@registry/repository";
import { DeleteMatchUsecase } from "@usecase/matches/deleteMatch.usecase";

const deleteMatchUsecase = new DeleteMatchUsecase(repository);

export async function DELETE(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    const matchId = pathname.split("/")[3];
    console.log(matchId);
    if (!matchId) {
      throw Error("id is required");
    }
    await deleteMatchUsecase.execute(matchId);
    console.log("Successfully deleted: id = ", matchId);
    return Response.json({
      data: {
        message: "削除に成功しました",
      },
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
