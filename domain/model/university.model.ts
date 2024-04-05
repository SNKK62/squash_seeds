import { Region } from "@model/region";

export class University {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly shortName: string,
    public readonly region: Region
  ) {}

  static fromJSON(json: any): University {
    return new University(json.id, json.name, json.shortName, json.region);
  }
}
