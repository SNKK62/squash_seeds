import { prisma } from "@infrastructure/db/client";
import { convertToPlayer } from "@infrastructure/db/converters/player";
import { Player } from "@model/player.model";
import { IPlayerRepo } from "@repository/player.repo";

const getPlayersNotRetired = async (): Promise<Player[]> => {
  try {
    const dbPlayers = await prisma.player.findMany({
      where: {
        isRetired: false,
      },
      include: {
        university: true,
      },
    });

    return dbPlayers.map((dbPlayer) => {
      return convertToPlayer(dbPlayer);
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const PlayerRepo: IPlayerRepo = {
  getPlayersNotRetired,
};
