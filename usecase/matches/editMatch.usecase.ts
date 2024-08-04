import { Match } from "@model/match.model";
import { UpdateMatchInput } from "@repository/match.repo";
import { Repo } from "@repository/repository";
import { AuthService } from "@service/auth.service";

export type EditMatchesUsecaseInput = UpdateMatchInput & {
  email: string;
  password: string;
};

export class EditMatchUsecase {
  private readonly service: AuthService;
  constructor(private readonly repo: Repo) {
    this.service = new AuthService(repo);
  }
  public async execute(input: EditMatchesUsecaseInput): Promise<Match> {
    try {
      await this.service.login(input.email, input.password);
      return await this.repo.match.updateMatch({
        ...input,
      });
    } catch (e) {
      throw e;
    }
  }
}
