import { MatchMeta } from "@model/matchMeta.model";
import { Sex } from "../model/sex";

export type CreateMatchMetaInput = {
  type: string;
  isRated: boolean;
  sex: Sex;
  tournamentId: string;
};

export type IMatchMetaRepo = {
  getMatchMetasByTournamentId: (tournamentId: string) => Promise<MatchMeta[]>;
  createMatchMeta: (input: CreateMatchMetaInput) => Promise<MatchMeta>;
};
