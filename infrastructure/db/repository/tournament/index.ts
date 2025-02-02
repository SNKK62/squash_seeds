import { prisma } from "@db/client";
import { convertToTournament } from "@infrastructure/db/converters/tournament";
import { Region } from "@model/region";
import { Tournament } from "@model/tournament.model";
import {
  CreateTournamentInput,
  ITournamentRepo,
} from "@repository/tournament.repo";

export const openTournamentNotFoundMessage = "Open tournament not found.";

const getOpenTournamentByRegion = async (
  region: Region
): Promise<Tournament> => {
  try {
    const dbTournament = await prisma.tournament.findMany({
      where: {
        OR: [
          {
            region: "全日本",
            isOpen: true,
          },
          {
            region,
            isOpen: true,
          },
        ],
      },
    });
    if (!dbTournament[0]) {
      throw new Error(openTournamentNotFoundMessage);
    }
    return convertToTournament(dbTournament[0]);
  } catch (e) {
    throw e;
  }
};

const createTournament = async (
  input: CreateTournamentInput
): Promise<Tournament> => {
  try {
    const tournament = await prisma.tournament.create({
      data: {
        name: input.name,
        region: input.region,
        beginAt: input.beginAt,
        endAt: input.endAt,
        isTeam: input.isTeam,
      },
    });
    return convertToTournament(tournament);
  } catch (e) {
    throw e;
  }
};

export const TournamentRepo: ITournamentRepo = {
  getOpenTournamentByRegion,
  createTournament,
};
