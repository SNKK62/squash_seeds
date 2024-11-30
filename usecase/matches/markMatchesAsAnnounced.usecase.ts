import { IMatchRepo } from "@repository/match.repo";
import { Repo } from "@repository/repository";

export class MarkMatchesAsAnnouncedUsecase {
  private readonly matchRepo: IMatchRepo;
  constructor(repo: Repo) {
    this.matchRepo = repo.match;
  }
  public async execute(ids: string[]): Promise<{ message: string }> {
    try {
      const announceResults = ids.map((id) => {
        return this.matchRepo.announceMatch(id);
      });
      await Promise.all(announceResults);
      return {
        message: "marked as announced successfully",
      };
    } catch (e) {
      throw e;
    }
  }
}
