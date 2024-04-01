import { isRegion } from "@/domain/model/region";
import { Tournament } from "@model/tournament.model";
import { Tournament as DBTournament } from "@prisma/client";

export const convertToTournament = (tournament: DBTournament): Tournament => {
  if (!isRegion(tournament.region)) {
    throw new Error("Invalid region");
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
