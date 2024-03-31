import { Match, Score } from "@model/match.model";
import { Sex } from "@model/sex";

type CreateMatchInput = {
  tournamentId: string;
  winnerId: string;
  loserId: string;
  gameCount: Score;
  gameScores: Score[];
  createdById: string;
  matchMetaId: string;
  isDefo: Boolean;
};

export type IMatchRepo = {
  getMatchesByTournamentId: (tournamentId: string) => Match[];
  getMatchesByTournamentIdAndSex: (tournamentId: string, sex: Sex) => Match[];
  createMatch: (input: CreateMatchInput) => void;
};
