"use server";
import "server-only";
import { parseWithZod } from "@conform-to/zod";

import { createTournamentSchema } from "@actions/schema/createTournament.schema";
import { Region } from "@model/region";
import { Sex } from "@model/sex";
import { repository } from "@registry/repository";
import {
  PostTournamentsUsecase,
  PostTournamentsUsecaseInput,
} from "@usecase/tournaments/postTournaments.usecase";

export async function createTournamentAction(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: createTournamentSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  console.log(submission.payload);
  try {
    const usecase = new PostTournamentsUsecase(repository);
    const input: PostTournamentsUsecaseInput = {
      tournament: {
        name: submission.payload["name"] as string,
        region: submission.payload["region"] as Region,
        beginAt: submission.payload["beginAt"] as string,
        endAt: submission.payload["endAt"] as string,
        isTeam: submission.payload["isTeam"] === "true",
      },
      matchMetas:
        (
          submission.payload["matchMetas"] as {
            type: string;
            isRated: string;
            sex: string;
          }[]
        )?.map((matchMeta) => {
          return {
            type: matchMeta["type"] as string,
            isRated: matchMeta["isRated"] === "true",
            sex: matchMeta["sex"] as Sex,
          };
        }) ?? [],
    };

    await usecase.execute(input);

    return;
  } catch (e) {
    console.log(e);
    return submission.reply({
      formErrors: [String(e)],
    });
  }
}
