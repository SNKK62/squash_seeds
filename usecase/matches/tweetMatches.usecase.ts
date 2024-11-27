import { IMatchRepo } from "@repository/match.repo";
import { Repo } from "@repository/repository";
import { TweetService } from "@service/tweet.service";

export class TweetMatchesUsecase {
  private readonly service: TweetService;
  private readonly matchRepo: IMatchRepo;
  constructor(repo: Repo) {
    this.service = new TweetService(repo);
    this.matchRepo = repo.match;
  }
  public async execute(
    ids: string[],
    isNational: boolean
  ): Promise<{ message: string }> {
    try {
      await this.service.tweet(ids, isNational);
      const announceResults = ids.map((id) => {
        return this.matchRepo.announceMatch(id);
      });
      await Promise.all(announceResults);
      return {
        message: "Tweeted successfully",
      };
    } catch (e) {
      throw e;
    }
  }
}
