import { openTournamentNotFoundMessage } from "@db/repository/tournament";
import { Tournament } from "@model/tournament.model";
import { CreateMatchMetaInput } from "@repository/matchMeta.repo";
import { Repo } from "@repository/repository";
import { CreateTournamentInput } from "@repository/tournament.repo";

export type PostTournamentsUsecaseInput = {
  tournament: CreateTournamentInput;
  matchMetas: Omit<CreateMatchMetaInput, "tournamentId">[];
};

export class PostTournamentsUsecase {
  constructor(private readonly repo: Repo) {}

  public async execute(
    input: PostTournamentsUsecaseInput
  ): Promise<Tournament> {
    try {
      await this.repo.tournament.getOpenTournamentByRegion(
        input.tournament.region
      );
      throw new Error("There is already an open tournament in the region");
    } catch (e) {
      if (String(e) !== `Error: ${openTournamentNotFoundMessage}`) {
        throw e;
      }
    }
    try {
      // Create a tournament
      const tournament = await this.repo.tournament.createTournament(
        input.tournament
      );

      // Create match metas' information
      input.matchMetas.forEach(async (matchMeta) => {
        await this.repo.matchMeta.createMatchMeta({
          ...matchMeta,
          tournamentId: tournament.id,
        });
      });

      return tournament;
    } catch (e) {
      throw e;
    }
  }
}
