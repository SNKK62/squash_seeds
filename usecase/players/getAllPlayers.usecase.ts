import { Player } from "@model/player.model";
import { Repo } from "@repository/repository";

export type GetAllPlayersUsecaseOptions = {
  retired?: boolean;
};

export class GetAllPlayersUsecase {
  constructor(private readonly repo: Repo) {}

  public async execute(
    options: GetAllPlayersUsecaseOptions
  ): Promise<Player[]> {
    try {
      if (!options.retired) {
        const players = await this.repo.player.getPlayersNotRetired();
        return players;
      } else {
        throw new Error("Not implemented get retired players");
      }
    } catch (e) {
      throw e;
    }
  }
}
