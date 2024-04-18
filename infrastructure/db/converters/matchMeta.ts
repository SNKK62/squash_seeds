import {
  MatchMeta as DBMatchMeta,
  Tournament as DBTournament,
} from "@prisma/client";

import { convertToTournament } from "./tournament";

import { MatchMeta } from "@model/matchMeta.model";
import { isSex } from "@model/sex";

export type DBMatchMetaWithTournament = DBMatchMeta & {
  tournament: DBTournament;
};

export const convertToMatchMeta = (dbMatchMeta: DBMatchMetaWithTournament) => {
  if (!isSex(dbMatchMeta.sex)) {
    throw new Error("invalid Sex");
  }
  const tournament = convertToTournament(dbMatchMeta.tournament);
  return new MatchMeta(
    dbMatchMeta.id,
    dbMatchMeta.type,
    tournament,
    dbMatchMeta.isRated,
    dbMatchMeta.sex
  );
};
