import { GakurenWithAuthData } from "@repository/gakuren.repo";
import { Repo } from "@repository/repository";

export class GetGakurenSelfUsecase {
  constructor(private repo: Repo) {}

  async execute(email: string): Promise<GakurenWithAuthData> {
    try {
      return await this.repo.gakuren.getGakurenWithAuthDataByEmail(email);
    } catch (e) {
      throw e;
    }
  }
}
