import { Region } from "./region";

export class University {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly shortName: string,
    public readonly region: Region
  ) {}
}
