import {
  CreateGakurenInput,
  GakurenWithAuthData,
} from "@repository/gakuren.repo";
import { Repo } from "@repository/repository";
import { AuthService } from "@service/auth.service";

type SignupUsecaseInput = CreateGakurenInput;

export class SignupUsecase {
  private readonly authService: AuthService;
  constructor(repo: Repo) {
    this.authService = new AuthService(repo);
  }

  public async execute(
    input: SignupUsecaseInput
  ): Promise<GakurenWithAuthData> {
    try {
      return await this.authService.signup(input);
    } catch (e) {
      throw e;
    }
  }
}
