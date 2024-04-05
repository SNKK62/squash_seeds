import { Gakuren } from "@model/gakuren.model";
import { MatchMeta } from "@model/matchMeta.model";
import { Player } from "@model/player.model";
import { Tournament } from "@model/tournament.model";

export class Score {
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
    public readonly gameScores: Score[],
    public readonly createdBy: Gakuren,
    public readonly createdAt: Date,
    public readonly matchMeta: MatchMeta,
    public readonly isDefo: boolean,
    public readonly isAnnounced: boolean
  ) {}

  get fullScore(): string {
    return `${this.gameCount.concatenatedScore} ${this.gameScores.map((score) => score.concatenatedScore).join(" ")}`;
  }

  get formattedScore(): string {
    return `${this.winner.lastNameWithUnivShortName} bt. ${this.loser.lastNameWithUnivShortName} ${this.fullScore}`;
  }

  get maxGameCount(): number {
    switch (this.gameCount.winnerScore) {
      case 1:
        return 1;
      case 2:
        return 3;
      case 3:
        return 5;
      default:
        throw new Error("Invalid game count");
    }
  }

  static fromJSON(json: any): Match {
    return new Match(
      json.id,
      Player.fromJSON(json.winner),
      Player.fromJSON(json.loser),
      Tournament.fromJSON(json.tournament),
      new Score(json.winnerGameCount, json.loserGameCount),
      json.gameScores.map(
        (gameScore: any) =>
          new Score(gameScore.winnerScore, gameScore.loserScore)
      ),
      Gakuren.fromJSON(json.createdByGakuren),
      new Date(json.createdAt),
      MatchMeta.fromJSON(json.matchMeta),
      json.isDefo,
      json.isAnnounced
    );
  }
}
