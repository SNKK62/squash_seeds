import { IMatchRepo } from "@repository/match.repo";
import { Repo } from "@repository/repository";

export class TweetService {
  private readonly matchRepo: IMatchRepo;

  constructor(repo: Repo) {
    this.matchRepo = repo.match;
  }

  public async tweet(ids: string[]): Promise<void> {
    try {
      const promises: Promise<void>[] = [];
      ids.map(async (id) => {
        promises.push(this.matchRepo.announceMatch(id));
      });
      await Promise.all(promises);
    } catch (e) {
      throw e;
    }
  }
}
