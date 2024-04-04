import { Gakuren } from "@model/gakuren.model";
import { CreateGakurenInput } from "@repository/gakuren.repo";
import { Repo } from "@repository/repository";
import { AuthService } from "@service/auth.service";

type SignupUsecaseInput = CreateGakurenInput;

export class SignupUsecase {
  private readonly authService: AuthService;
  constructor(repo: Repo) {
    this.authService = new AuthService(repo);
  }

  public async execute(input: SignupUsecaseInput): Promise<Gakuren> {
    try {
      return await this.authService.signup(input);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}