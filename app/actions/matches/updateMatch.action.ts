"use server";
import "server-only";
import { parseWithZod } from "@conform-to/zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { updateMatchSchema } from "@actions/schema/updateMatch.schema";
import { Score } from "@model/match.model";
import { repository } from "@registry/repository";
import {
  EditMatchUsecase,
  EditMatchesUsecaseInput,
} from "@usecase/matches/editMatch.usecase";

export async function updateMatchAction(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: updateMatchSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  try {
    const usecase = new EditMatchUsecase(repository);

    const cookieStore = cookies();
    const email = cookieStore.get("email");
    const password = cookieStore.get("password");
    if (!email || !password) {
      throw Error("Unauthorized");
    }

    const scores = (submission.payload["scores"] ?? []) as {
      winnerScore: string;
      loserScore: string;
    }[];
    const gameCount = submission.payload["gameCount"] as {
      winnerScore: string;
      loserScore: string;
    };

    const input: EditMatchesUsecaseInput = {
      id: submission.payload["id"] as string,
      winnerId: submission.payload["winnerId"] as string,
      loserId: submission.payload["loserId"] as string,
      isDefo: submission.payload["isDefo"] == "true",
      matchMetaId: submission.payload["matchMetaId"] as string,
      gameCount: new Score(
        Number(gameCount ? gameCount["winnerScore"] : 0),
        Number(gameCount ? gameCount["loserScore"] : 0)
      ),
      gameScores: scores.map((score) => {
        return new Score(Number(score.winnerScore), Number(score.loserScore));
      }),
      email: email.value,
      password: password.value,
    };

    await usecase.execute(input);
  } catch (e) {
    console.log(e);
    return submission.reply({
      formErrors: [String(e)],
    });
  }

  redirect("/tournament/matches/notAnnounced");
}
