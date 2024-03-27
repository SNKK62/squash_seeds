import { Player } from "./player.model";
import { Region } from "./region";
import { Sex } from "./sex";

export class Seed {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly region: Region,
    public readonly ranks: Player[],
    public readonly sex: Sex
  ) {}
}
