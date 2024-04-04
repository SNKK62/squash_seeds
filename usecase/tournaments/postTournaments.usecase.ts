import { Tournament } from "@model/tournament.model";
import { CreateMatchMetaInput } from "@repository/matchMeta.repo";
import { Repo } from "@repository/repository";
import { CreateTournamentInput } from "@repository/tournament.repo";

type PostTournamentsUsecaseInput = {
  tournament: CreateTournamentInput;
  matchMetas: Exclude<CreateMatchMetaInput, "tournamentId">[];
};

export class PostTournamentsUsecase {
  constructor(private readonly repo: Repo) {}

  public async execute(
    input: PostTournamentsUsecaseInput
  ): Promise<Tournament> {
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
