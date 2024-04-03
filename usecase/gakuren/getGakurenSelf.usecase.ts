import { Gakuren } from "@model/gakuren.model";
import { Repo } from "@repository/repository";

export class GetGakurenSelfUsecase {
  constructor(private repo: Repo) {}

  async execute(id: string): Promise<Gakuren> {
    try {
      return await this.repo.gakuren.getGakurenById(id);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
