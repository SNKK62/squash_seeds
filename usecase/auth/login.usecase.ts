import { Gakuren } from "@model/gakuren.model";
import { Repo } from "@repository/repository";
import { AuthService } from "@service/auth.service";

export class LoginUsecase {
  private readonly authService: AuthService;
  constructor(repo: Repo) {
    this.authService = new AuthService(repo);
  }

  public async execute(email: string, password: string): Promise<Gakuren> {
    try {
      return await this.authService.login(email, password);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
