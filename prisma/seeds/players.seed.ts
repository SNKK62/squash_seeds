import { PrismaClient } from "@prisma/client";
import data from "../data/players.json";

export const setPlayerData = async (prisma: PrismaClient) => {
  try {
    data.forEach(async (player) => {
      await prisma.player.create({
        data: {
          firstName: player.firstName,
          lastName: player.lastName,
          universityId: player.universityId,
          grade: player.grade,
          sex: player.sex,
        },
      });
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};
