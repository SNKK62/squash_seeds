import { Region } from "@model/region";

export type UniversityJSON = {
  id: number;
  name: string;
  shortName: string;
  region: Region;
};

export class University {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly shortName: string,
    public readonly region: Region
  ) {}

  static fromJSON(json: UniversityJSON): University {
    return new University(json.id, json.name, json.shortName, json.region);
  }
}
