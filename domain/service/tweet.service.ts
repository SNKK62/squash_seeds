import { IMatchRepo } from "@repository/match.repo";
import { Repo } from "@repository/repository";
import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
  // these two values come from your app's API keys
  appKey: process.env["X_API_KEY"] as string,
  appSecret: process.env["X_API_KEY_SECRET"] as string,
  // these two values come from the user's access tokens
  accessToken: process.env["X_ACCESS_TOKEN"] as string,
  accessSecret: process.env["X_ACCESS_TOKEN_SECRET"] as string,
});

export class TweetService {
  private readonly matchRepo: IMatchRepo;

  constructor(repo: Repo) {
    this.matchRepo = repo.match;
  }

  public async tweet(ids: string[]): Promise<void> {
    try {
      const res = await client.v2.tweet("Hello world from the v2 Twitter API!");
      console.log(res);
    } catch (e) {
      throw e;
    }
  }
}
