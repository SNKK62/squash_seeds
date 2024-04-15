import { Match } from "@model/match.model";
import { Repo } from "@repository/repository";
import { AuthService } from "@service/auth.service";

export class GetAllMatchesNotAnnouncedUsecase {
  private readonly service: AuthService;
  constructor(private readonly repo: Repo) {
    this.service = new AuthService(repo);
  }
  public async execute(email: string, password: string): Promise<Match[]> {
    try {
      const self = await this.service.login(email, password);
      const tournament = await this.repo.tournament.getOpenTournamentByRegion(
        self.gakuren.region
      );
      return await this.repo.match.getMatchesNotAnnouncedByTournamentId(
        tournament.id
      );
    } catch (e) {
      throw e;
    }
  }
}
