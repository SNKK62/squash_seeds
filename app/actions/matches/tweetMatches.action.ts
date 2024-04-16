"use server";
import "server-only";

import { repository } from "@registry/repository";
import { TweetMatchesUsecase } from "@usecase/matches/tweetMatches.usecase";

export async function tweetMatchesAction(matchIds: string[], _: FormData) {
  try {
    const usecase = new TweetMatchesUsecase(repository);
    await usecase.execute(matchIds);

    return;
  } catch (e) {
    console.log(e);
    return { error: String(e) };
  }
}
