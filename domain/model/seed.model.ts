import { Player } from "@model/player.model";
import { Region } from "@model/region";
import { Sex } from "@model/sex";

export class Seed {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly region: Region,
    public readonly ranks: Player[],
    public readonly sex: Sex,
    public readonly createdAt: Date
  ) {}
}
