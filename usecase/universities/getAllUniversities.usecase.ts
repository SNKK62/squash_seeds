import { University } from "@model/university.model";
import { Repo } from "@repository/repository";

export class GetAllUniversitiesUsecase {
  constructor(private readonly repo: Repo) {}

  public async execute(): Promise<University[]> {
    try {
      return await this.repo.university.getAllUniversities();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
