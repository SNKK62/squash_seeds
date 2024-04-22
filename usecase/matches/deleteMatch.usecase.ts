import { Repo } from "@repository/repository";

export class DeleteMatchUsecase {
  constructor(private readonly repo: Repo) {}
  public async execute(id: string): Promise<void> {
    try {
      const match = await this.repo.match.getMatchById(id);
      if (match.isAnnounced) {
        throw Error("This match is already announced");
      }
      return await this.repo.match.deleteMatchById(id);
    } catch (e) {
      throw e;
    }
  }
}
