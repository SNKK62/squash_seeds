import { Match } from "@model/match.model";
import { Repo } from "@repository/repository";

export class GetAllMatchesNotAnnouncedUsecase {
  constructor(private readonly repo: Repo) {}
  public async execute(tournamentId: string): Promise<Match[]> {
    try {
      return await this.repo.match.getMatchesNotAnnouncedByTournamentId(
        tournamentId
      );
    } catch (e) {
      throw e;
    }
  }
}
