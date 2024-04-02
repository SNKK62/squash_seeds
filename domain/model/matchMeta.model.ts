import { Sex } from "@model/sex";
import { Tournament } from "@model/tournament.model";

export class MatchMeta {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly tournament: Tournament,
    public readonly isRated: boolean,
    public readonly sex: Sex
  ) {}
}
