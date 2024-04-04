import { prisma } from "@infrastructure/db/client";
import { convertToMatchMeta } from "@infrastructure/db/converters/matchMeta";
import { MatchMeta } from "@model/matchMeta.model";
import {
  CreateMatchMetaInput,
  IMatchMetaRepo,
} from "@repository/matchMeta.repo";

const getMatchMetasByTournamentId = async (
  tournamentId: string
): Promise<MatchMeta[]> => {
  try {
    const matchMetas = await prisma.matchMeta.findMany({
      where: {
        tournamentId,
      },
      include: {
        tournament: true,
      },
    });
    return matchMetas.map((matchMeta) => convertToMatchMeta(matchMeta));
  } catch (e) {
    throw e;
  }
};

const createMatchMeta = async (
  input: CreateMatchMetaInput
): Promise<MatchMeta> => {
  try {
    const matchMeta = await prisma.matchMeta.create({
      data: {
        type: input.type,
        isRated: input.isRated,
        sex: input.sex,
        tournamentId: input.tournamentId,
      },
      include: {
        tournament: true,
      },
    });
    return convertToMatchMeta(matchMeta);
  } catch (e) {
    throw e;
  }
};

export const MatchMetaRepo: IMatchMetaRepo = {
  getMatchMetasByTournamentId,
  createMatchMeta,
};
