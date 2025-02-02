import { Gakuren, GakurenJSON } from "@model/gakuren.model";
import { MatchMeta, MatchMetaJSON } from "@model/matchMeta.model";
import { Player, PlayerJSON } from "@model/player.model";
import { Tournament, TournamentJSON } from "@model/tournament.model";

export type ScoreJSON = {
  winnerScore: number;
  loserScore: number;
};

export class Score {
  constructor(
    public readonly winnerScore: number,
    public readonly loserScore: number
  ) {}

  get concatenatedScore(): string {
    return `${this.winnerScore}-${this.loserScore}`;
  }

  get concatenatedScoreLoserFirst(): string {
    return `${this.loserScore}-${this.winnerScore}`;
  }

  static fromJSON(json: ScoreJSON): Score {
    return new Score(json.winnerScore, json.loserScore);
  }
}

export type MatchJSON = {
  id: string;
  winner: PlayerJSON;
  loser: PlayerJSON;
  tournament: TournamentJSON;
  gameCount: ScoreJSON;
  gameScores: ScoreJSON[];
  createdBy: GakurenJSON;
  createdAt: string;
  matchMeta: MatchMetaJSON;
  isDefo: boolean;
  isAnnounced: boolean;
};

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
    return `${this.gameCount.concatenatedScore} ${this.gameScores.map((score) => score.concatenatedScore).join(", ")}`;
  }

  get fullScoreLoserFirst(): string {
    return `${this.gameCount.concatenatedScoreLoserFirst} ${this.gameScores.map((score) => score.concatenatedScoreLoserFirst).join(", ")}`;
  }

  get formattedScore(): string {
    return this.isDefo
      ? `${this.winner.lastNameWithUnivShortName} bt. ${this.loser.lastNameWithUnivShortName} w/o`
      : `${this.winner.lastNameWithUnivShortName} bt. ${this.loser.lastNameWithUnivShortName} ${this.fullScore}`;
  }

  get formattedScoreLoserFirst(): string {
    return this.isDefo
      ? `${this.loser.lastNameWithUnivShortName} lt. ${this.winner.lastNameWithUnivShortName} w/o`
      : `${this.loser.lastNameWithUnivShortName} lt. ${this.winner.lastNameWithUnivShortName} ${this.fullScoreLoserFirst}`;
  }

  formattedScoreWithFirstPlayerSelection(former: Player): string {
    if (this.winner.id === former.id) {
      return this.formattedScore;
    }
    return this.formattedScoreLoserFirst;
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

  static fromJSON(json: MatchJSON): Match {
    return new Match(
      json.id,
      Player.fromJSON(json.winner),
      Player.fromJSON(json.loser),
      Tournament.fromJSON(json.tournament),
      Score.fromJSON(json.gameCount),
      json.gameScores.map((gameScore: ScoreJSON) => Score.fromJSON(gameScore)),
      Gakuren.fromJSON(json.createdBy),
      new Date(json.createdAt),
      MatchMeta.fromJSON(json.matchMeta),
      json.isDefo,
      json.isAnnounced
    );
  }
}
