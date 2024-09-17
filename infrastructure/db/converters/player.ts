import {
  Player as DBPlayer,
  University as DBUniversity,
  Tournament as DBTournament,
} from "@prisma/client";

import { convertToTournament } from "./tournament";
import { convertToUniversity } from "./university";

import { Player } from "@model/player.model";
import { isSex } from "@model/sex";

export type DBPlayerWithUniversityAndTournament = DBPlayer & {
  university: DBUniversity;
  tournament: DBTournament;
};

export const convertToPlayer = (
  dbPlayer: DBPlayerWithUniversityAndTournament
): Player => {
  if (!isSex(dbPlayer.sex)) {
    throw new Error("invalid Sex");
  }
  const university = convertToUniversity(dbPlayer.university);
  const tournament = convertToTournament(dbPlayer.tournament);
  return new Player(
    dbPlayer.id,
    dbPlayer.firstName,
    dbPlayer.lastName,
    dbPlayer.grade,
    university,
    tournament,
    dbPlayer.sex,
    dbPlayer.isRetired
  );
};
