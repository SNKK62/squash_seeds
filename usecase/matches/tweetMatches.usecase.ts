import { Repo } from "@repository/repository";
import { TweetService } from "@service/tweet.service";

export class TweetMatchesUsecase {
  private readonly service: TweetService;
  constructor(repo: Repo) {
    this.service = new TweetService(repo);
  }
  public async execute(ids: string[]): Promise<{ message: string }> {
    try {
      await this.service.tweet(ids);
      return {
        message: "Tweeted successfully",
      };
    } catch (e) {
      throw e;
    }
  }
}
