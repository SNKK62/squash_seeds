import { MatchMeta } from "@model/matchMeta.model";
import { Repo } from "@repository/repository";
import { AuthService } from "@service/auth.service";

export class GetOpenMatchMetasUsecase {
  private readonly service: AuthService;
  constructor(private readonly repo: Repo) {
    this.service = new AuthService(repo);
  }

  async execute(email: string, password: string): Promise<MatchMeta[]> {
    try {
      const self = await this.service.login(email, password);
      const tournament = await this.repo.tournament.getOpenTournamentByRegion(
        self.gakuren.region
      );
      return await this.repo.matchMeta.getMatchMetasByTournamentId(
        tournament.id
      );
    } catch (e) {
      throw e;
    }
  }
}
