// import { TwitterApiRateLimitPlugin } from "@twitter-api-v2/plugin-rate-limit";
import { TwitterApi } from "twitter-api-v2";

import { Match } from "@model/match.model";
import { IMatchRepo } from "@repository/match.repo";
import { Repo } from "@repository/repository";

// const rateLimitPlugin = new TwitterApiRateLimitPlugin();
// for kando
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

// for All Japan
const client_alljp = new TwitterApi(
  {
    // these two values come from your app's API keys
    appKey: process.env["X_ALLJP_API_KEY"] as string,
    appSecret: process.env["X_ALLJP_API_KEY_SECRET"] as string,
    // these two values come from the user's access tokens
    accessToken: process.env["X_ALLJP_ACCESS_TOKEN"] as string,
    accessSecret: process.env["X_ALLJP_ACCESS_TOKEN_SECRET"] as string,
  }
  // { plugins: [rateLimitPlugin] }
);

function calculateTweetLength(text: string): number {
  let length = 0;
  for (const char of text) {
    if (char === "\n") {
      // 改行文字
      length += 2;
    } else if (char.match(/[ -~]/)) {
      // 半角文字
      length += 1;
    } else {
      // 全角文字
      length += 2;
    }
  }
  return length;
}

export class TweetService {
  private readonly matchRepo: IMatchRepo;
  constructor(repo: Repo) {
    this.matchRepo = repo.match;
  }

  public async tweet(ids: string[], isNational: boolean): Promise<void> {
    try {
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
      // const tournamentName = matchesNotAnnounced[0]?.tournament.name;
      const resultDividedByMatchMeta: Record<string, string[]> = {};
      matchesNotAnnounced.forEach((match) => {
        const matchMetaType = match.matchMeta.type;
        if (!resultDividedByMatchMeta[matchMetaType]) {
          resultDividedByMatchMeta[matchMetaType] = [];
        }
        resultDividedByMatchMeta[matchMetaType].push(match.formattedScore);
      });
      // save the tweet text length
      // let tweetText: string = tournamentName ? `【${tournamentName}】\n` : "";
      let tweetText: string = "";
      tweetText += Object.entries(resultDividedByMatchMeta)
        .map(([key, value]) => {
          let text = `${key}`;
          value.map((el) => {
            text += `\n${el}`;
          });
          text += `\n`;
          return text;
        })
        .join("\n");

      const tweetLength = calculateTweetLength(tweetText);
      const TWEET_LENGTH_LIMIT = 280;
      if (tweetLength > TWEET_LENGTH_LIMIT) {
        throw new Error("Tweet text is too long");
      }

      const execClient = isNational ? client_alljp : client;
      const res = await execClient.v2.tweet(tweetText);
      if (res.errors && res.errors.length > 0) {
        const error = res.errors[0];
        throw new Error(error?.title);
      }
      // NOTE: This is how you can get the current rate limit for your app
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
