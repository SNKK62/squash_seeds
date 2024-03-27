import { Gakuren } from "./gakuren.model";
import { MatchMeta } from "./matchMeta.model";
import { Player } from "./player.model";
import { Tournament } from "./tournament.model";

class Score {
  constructor(
    public readonly winnerScore: number,
    public readonly loserScore: number
  ) {}

  get concatenatedScore(): string {
    return `${this.winnerScore}-${this.loserScore}`;
  }
}

export class Match {
  constructor(
    public readonly id: string,
    public readonly winner: Player,
    public readonly loser: Player,
    public readonly tournament: Tournament,
    public readonly gameCount: Score,
    public readonly gameScore: Score[],
    public readonly createdBy: Gakuren,
    public readonly createdAt: Date,
    public readonly matchMeta: MatchMeta
    // TODO: adapt to Twitter API
  ) {}

  get fullScore(): string {
    return `${this.gameCount.concatenatedScore} ${this.gameScore.map((score) => score.concatenatedScore).join(" ")}`;
  }

  get formattedScore(): string {
    return `${this.winner.lastNameWithUnivShortName} bt. ${this.loser.lastNameWithUnivShortName} ${this.fullScore}`;
  }
}
