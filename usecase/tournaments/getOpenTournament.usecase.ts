import { Tournament } from "@model/tournament.model";
import { Repo } from "@repository/repository";
import { AuthService } from "@service/auth.service";

export class GetOpenTournamentUsecase {
  private readonly service: AuthService;
  constructor(private readonly repo: Repo) {
    this.service = new AuthService(repo);
  }

  async execute(email: string, password: string): Promise<Tournament> {
    try {
      const self = await this.service.login(email, password);
      const tournament = await this.repo.tournament.getOpenTournamentByRegion(
        self.gakuren.region
      );
      return tournament;
    } catch (e) {
      throw e;
    }
  }
}
