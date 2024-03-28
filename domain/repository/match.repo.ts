import { Match } from "../model/match.model";
import { Sex } from "../model/sex";

export type IMatchRepo = {
  getMatches: () => Match[];
  getMatchesByTournamentId: (tournamentId: string) => Match[];
  getMatchesByTournamentIdAndSex: (tournamentId: string, sex: Sex) => Match[];
  getMatchById: (id: string) => Match;
  createMatch: (match: Match) => void;
};
