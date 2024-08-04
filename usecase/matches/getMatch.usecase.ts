import { Match } from "@model/match.model";
import { Repo } from "@repository/repository";

export class GetMatchUsecase {
  constructor(private readonly repo: Repo) {}
  public async execute(id: string): Promise<Match> {
    try {
      return await this.repo.match.getMatchById(id);
    } catch (e) {
      throw e;
    }
  }
}
