import { Sex } from "@model/sex";
import { Tournament, TournamentJSON } from "@model/tournament.model";

export type MatchMetaJSON = {
  id: string;
  type: string;
  tournament: TournamentJSON;
  isRated: boolean;
  sex: Sex;
};

export class MatchMeta {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly tournament: Tournament,
    public readonly isRated: boolean,
    public readonly sex: Sex
  ) {}

  static fromJSON(json: MatchMetaJSON): MatchMeta {
    return new MatchMeta(
      json.id,
      json.type,
      Tournament.fromJSON(json.tournament),
      json.isRated,
      json.sex
    );
  }
}
