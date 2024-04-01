import { Region } from "@model/region";
import { Tournament } from "@model/tournament.model";
import {
  CreateTournamentInput,
  ITournamentRepo,
} from "@repository/tournament.repo";
import { prisma } from "@db/client";
import { convertToTournament } from "@infrastructure/db/converters/tournament";

const getOpenTournamentByRegion = async (
  region: Region
): Promise<Tournament> => {
  try {
    const dbTournament = await prisma.tournament.findMany({
      where: {
        region,
        isOpen: true,
      },
    });
    if (dbTournament.length > 1) {
      throw new Error("Open tournament must be only one.");
    }
    if (!dbTournament[0]) {
      throw new Error("Open tournament not found.");
    }
    return convertToTournament(dbTournament[0]);
  } catch (e) {
    throw e;
  }
};

const createTournament = async (
  input: CreateTournamentInput
): Promise<void> => {
  try {
    await prisma.tournament.create({
      data: {
        name: input.name,
        region: input.region,
        beginAt: input.beginAt,
        endAt: input.endAt,
        isTeam: input.isTeam,
      },
    });
  } catch (e) {
    throw e;
  }
};

export const TournamentRepo: ITournamentRepo = {
  getOpenTournamentByRegion,
  createTournament,
};
