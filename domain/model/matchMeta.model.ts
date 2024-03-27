import { Tournament } from "./tournament.model";

export class MatchMeta {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly tournament: Tournament,
    public readonly isRated: boolean
  ) {}
}
