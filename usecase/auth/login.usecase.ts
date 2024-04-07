import { GakurenWithAuthData } from "@repository/gakuren.repo";
import { Repo } from "@repository/repository";
import { AuthService } from "@service/auth.service";

export class LoginUsecase {
  private readonly authService: AuthService;
  constructor(repo: Repo) {
    this.authService = new AuthService(repo);
  }

  public async execute(
    email: string,
    password: string
  ): Promise<GakurenWithAuthData> {
    try {
      return await this.authService.login(email, password);
    } catch (e) {
      throw e;
    }
  }
}
