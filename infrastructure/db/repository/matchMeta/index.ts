import { prisma } from "@infrastructure/db/client";
import {
  CreateMatchMetaInput,
  IMatchMetaRepo,
} from "@repository/matchMeta.repo";

const createMatchMeta = async (input: CreateMatchMetaInput): Promise<void> => {
  try {
    await prisma.matchMeta.create({
      data: {
        type: input.type,
        isRated: input.isRated,
        sex: input.sex,
        tournamentId: input.tournamentId,
      },
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const MatchMetaRepo: IMatchMetaRepo = {
  createMatchMeta,
};
