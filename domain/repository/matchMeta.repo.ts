import { Sex } from "../model/sex";

import { MatchMeta } from "@model/matchMeta.model";

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
