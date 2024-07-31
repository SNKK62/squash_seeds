import { TwitterApi } from "twitter-api-v2";

import { Match } from "@model/match.model";
import { IMatchRepo } from "@repository/match.repo";
import { Repo } from "@repository/repository";

// import { TwitterApiRateLimitPlugin } from "@twitter-api-v2/plugin-rate-limit";
// const rateLimitPlugin = new TwitterApiRateLimitPlugin();
const client = new TwitterApi(
  {
    // these two values come from your app's API keys
    appKey: process.env["X_API_KEY"] as string,
    appSecret: process.env["X_API_KEY_SECRET"] as string,
    // these two values come from the user's access tokens
    accessToken: process.env["X_ACCESS_TOKEN"] as string,
    accessSecret: process.env["X_ACCESS_TOKEN_SECRET"] as string,
  }
  // { plugins: [rateLimitPlugin] }
);

export class TweetService {
  private readonly matchRepo: IMatchRepo;
  constructor(repo: Repo) {
    this.matchRepo = repo.match;
  }

  public async tweet(ids: string[]): Promise<void> {
    try {
      console.log(ids);
      const matches = ids.map((id) => {
        const match = this.matchRepo.getMatchById(id);
        return match;
      });
      let matchesNotAnnounced: Match[] = [];
      await Promise.all(matches).then((data) => {
        matchesNotAnnounced = data.filter((match) => {
          return !match.isAnnounced;
        });
      });
      console.log(matchesNotAnnounced);
      const resultDividedByMatchMeta: Record<string, string[]> = {};
      matchesNotAnnounced.forEach((match) => {
        const matchMetaType = match.matchMeta.type;
        if (!resultDividedByMatchMeta[matchMetaType]) {
          resultDividedByMatchMeta[matchMetaType] = [];
        }
        resultDividedByMatchMeta[matchMetaType].push(match.formattedScore);
      });
      const tweetText: string = Object.entries(resultDividedByMatchMeta)
        .map(([key, value]) => {
          let text = `[${key}]`;
          value.map((el) => {
            text += `\n${el}`;
          });
          text += `\n`;
          return text;
        })
        .join("\n");
      console.log(tweetText);
      const res = await client.v2.tweet(tweetText);
      if (res.errors && res.errors.length > 0) {
        const error = res.errors[0];
        throw new Error(error?.title);
      }
      console.log(res);
      // const currentRateLimitForMe = await rateLimitPlugin.v2.getRateLimit(
      //   "tweets",
      //   "POST"
      // );
      // console.log(currentRateLimitForMe);
      // console.log(currentRateLimitForMe!.limit); // 75
      // console.log(currentRateLimitForMe!.remaining);
    } catch (e) {
      throw e;
    }
  }
}
