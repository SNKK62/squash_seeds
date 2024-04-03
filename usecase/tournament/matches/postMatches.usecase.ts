import { Match } from "@model/match.model";
import { CreateMatchInput } from "@repository/match.repo";
import { Repo } from "@repository/repository";

export class PostMatchesUsecase {
  constructor(private readonly repo: Repo) {}
  public async execute(input: CreateMatchInput): Promise<Match> {
    try {
      return await this.repo.match.createMatch(input);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
