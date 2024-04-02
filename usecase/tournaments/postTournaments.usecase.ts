import { Tournament } from "@model/tournament.model";
import { CreateMatchMetaInput } from "@repository/matchMeta.repo";
import { Repo } from "@repository/repository";
import { CreateTournamentInput } from "@repository/tournament.repo";

type PostTournamentsUseCaseInput = {
  tournament: CreateTournamentInput;
  matchMetas: Exclude<CreateMatchMetaInput, "tournamentId">[];
};

export class PostTournamentsUseCase {
  constructor(private readonly repo: Repo) {}

  async execute(input: PostTournamentsUseCaseInput): Promise<Tournament> {
    try {
      const tournament = await this.repo.tournament.createTournament(
        input.tournament
      );

      input.matchMetas.forEach(async (matchMeta) => {
        await this.repo.matchMeta.createMatchMeta({
          ...matchMeta,
          tournamentId: tournament.id,
        });
      });

      return tournament;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
