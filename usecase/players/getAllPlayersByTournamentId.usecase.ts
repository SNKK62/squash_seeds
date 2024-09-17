import { Player } from "@model/player.model";
import { Repo } from "@repository/repository";

export class GetAllPlayersByTournamentIdUsecase {
  constructor(private readonly repo: Repo) {}

  public async execute(tournamentId: string): Promise<Player[]> {
    try {
      return await this.repo.player.getPlayersByTournamentId(tournamentId);
    } catch (e) {
      throw e;
    }
  }
}
