import { Match } from "@model/match.model";
import { CreateMatchInput } from "@repository/match.repo";
import { Repo } from "@repository/repository";
import { AuthService } from "@service/auth.service";

export type PostMatchesUsecaseInput = Omit<
  Omit<CreateMatchInput, "tournamentId">,
  "createdById"
> & {
  email: string;
  password: string;
};

export class PostMatchesUsecase {
  private readonly service: AuthService;
  constructor(private readonly repo: Repo) {
    this.service = new AuthService(repo);
  }
  public async execute(input: PostMatchesUsecaseInput): Promise<Match> {
    try {
      const self = await this.service.login(input.email, input.password);
      const tournament = await this.repo.tournament.getOpenTournamentByRegion(
        self.gakuren.region
      );
      return await this.repo.match.createMatch({
        ...input,
        createdById: self.gakuren.id,
        tournamentId: tournament.id,
      });
    } catch (e) {
      throw e;
    }
  }
}
