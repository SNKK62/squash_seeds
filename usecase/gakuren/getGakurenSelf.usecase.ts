import { GakurenWithAuthData } from "@repository/gakuren.repo";
import { Repo } from "@repository/repository";
import { AuthService } from "@service/auth.service";

export class GetGakurenSelfUsecase {
  private readonly service: AuthService;
  constructor(repo: Repo) {
    this.service = new AuthService(repo);
  }

  async execute(email: string, password: string): Promise<GakurenWithAuthData> {
    try {
      return await this.service.login(email, password);
    } catch (e) {
      throw e;
    }
  }
}
