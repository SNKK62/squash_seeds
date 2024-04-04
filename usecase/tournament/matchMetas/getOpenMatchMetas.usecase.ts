import { MatchMeta } from "@model/matchMeta.model";
import { Repo } from "@repository/repository";

export class GetOpenMatchMetasUsecase {
  constructor(private readonly repo: Repo) {}

  async execute(tournamentId: string): Promise<MatchMeta[]> {
    try {
      return await this.repo.matchMeta.getMatchMetasByTournamentId(
        tournamentId
      );
    } catch (e) {
      throw e;
    }
  }
}
