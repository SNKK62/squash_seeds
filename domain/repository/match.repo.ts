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
  getMatchesByTournamentIdAndSex: (
    tournamentId: string,
    sex: Sex
  ) => Promise<Match[]>;
  // TODO: implement getMatchesNotAnnouncedByTournamentId: (tournamentId: string) => Match[];
  createMatch: (input: CreateMatchInput) => Promise<void>;
};
