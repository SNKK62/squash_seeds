import { Match, Score } from "@model/match.model";
import { Sex } from "@model/sex";

export type CreateMatchInput = {
  tournamentId: string;
  winnerId: string;
  loserId: string;
  gameCount: Score;
  gameScores: Score[];
  createdById: string;
  matchMetaId: string;
  isDefo: boolean;
};

export type IMatchRepo = {
  getMatchesByTournamentIdAndSex: (
    tournamentId: string,
    sex: Sex
  ) => Promise<Match[]>;
  getMatchesNotAnnouncedByTournamentId: (
    tournamentId: string
  ) => Promise<Match[]>;
  createMatch: (input: CreateMatchInput) => Promise<Match>;
  announceMatch: (id: string) => Promise<void>;
  getMatchById: (id: string) => Promise<Match>;
  deleteMatchById: (id: string) => Promise<void>;
};
