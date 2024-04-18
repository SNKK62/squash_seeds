import { Tournament as DBTournament } from "@prisma/client";

import { isRegion } from "@/domain/model/region";

import { isDateString, Tournament } from "@model/tournament.model";

export const convertToTournament = (tournament: DBTournament): Tournament => {
  if (!isRegion(tournament.region)) {
    throw new Error("Invalid region");
  }
  if (!isDateString(tournament.beginAt)) {
    throw new Error("Invalid beginAt");
  }
  if (!isDateString(tournament.endAt)) {
    throw new Error("Invalid endAt");
  }
  return new Tournament(
    tournament.id,
    tournament.name,
    tournament.region,
    tournament.isOpen,
    tournament.isTeam,
    tournament.beginAt,
    tournament.endAt
  );
};
