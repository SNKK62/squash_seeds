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

  static fromJSON(json: any): MatchMeta {
    return new MatchMeta(
      json.id,
      json.type,
      Tournament.fromJSON(json.tournament),
      json.isRated,
      json.sex
    );
  }
}
