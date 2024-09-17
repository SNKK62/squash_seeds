import { PrismaClient } from "@prisma/client";

import data from "../data/players.json";

export const setPlayerData = async (prisma: PrismaClient) => {
  try {
    for (const player of data) {
      await prisma.player.create({
        data: {
          firstName: player.firstName,
          lastName: player.lastName,
          universityId: player.universityId,
          tournamentId: player.tournamentId,
          grade: player.grade,
          sex: player.sex,
          isRetired: player.isRetired,
        },
      });
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};
