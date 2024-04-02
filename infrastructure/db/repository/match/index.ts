import { prisma } from "@infrastructure/db/client";
import { convertToMatch } from "@infrastructure/db/converters/match";
import { Match } from "@model/match.model";
import { Sex } from "@model/sex";
import { CreateMatchInput, IMatchRepo } from "@repository/match.repo";

const includeAll = {
  matchMeta: {
    include: {
      tournament: true,
    },
  },
  tournament: true,
  winner: {
    include: {
      university: true,
    },
  },
  loser: {
    include: {
      university: true,
    },
  },
  createdByGakuren: {
    include: {
      university: true,
    },
  },
} as const;

const getMatchesByTournamentIdAndSex = async (
  id: string,
  sex: Sex
): Promise<Match[]> => {
  try {
    const dbMatches = await prisma.match.findMany({
      where: {
        tournamentId: id,
        matchMeta: {
          sex,
        },
      },
      include: includeAll,
    });
    return dbMatches.map((dbMatch) => convertToMatch(dbMatch));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getMatchesNotAnnouncedByTournamentId = async (
  id: string
): Promise<Match[]> => {
  try {
    const dbMatches = await prisma.match.findMany({
      where: {
        tournamentId: id,
        isAnnounced: false,
      },
      include: includeAll,
    });

    return dbMatches.map((dbMatch) => convertToMatch(dbMatch));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const createMatch = async (input: CreateMatchInput): Promise<void> => {
  try {
    await prisma.match.create({
      data: {
        winnerId: input.winnerId,
        loserId: input.loserId,
        tournamentId: input.tournamentId,
        createdByGakurenId: input.createdById,
        matchMetaId: input.matchMetaId,
        isDefo: input.isDefo,
        winnerGameCount: input.gameCount.winnerScore,
        loserGameCount: input.gameCount.loserScore,
        winnerGame1Score: input.gameScores[0]
          ? input.gameScores[0].winnerScore
          : null,
        winnerGame2Score: input.gameScores[1]
          ? input.gameScores[1].winnerScore
          : null,
        winnerGame3Score: input.gameScores[2]
          ? input.gameScores[2].winnerScore
          : null,
        winnerGame4Score: input.gameScores[3]
          ? input.gameScores[3].winnerScore
          : null,
        winnerGame5Score: input.gameScores[4]
          ? input.gameScores[4].winnerScore
          : null,
        loserGame1Score: input.gameScores[0]
          ? input.gameScores[0].loserScore
          : null,
        loserGame2Score: input.gameScores[1]
          ? input.gameScores[1].loserScore
          : null,
        loserGame3Score: input.gameScores[2]
          ? input.gameScores[2].loserScore
          : null,
        loserGame4Score: input.gameScores[3]
          ? input.gameScores[3].loserScore
          : null,
        loserGame5Score: input.gameScores[4]
          ? input.gameScores[4].loserScore
          : null,
      },
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const MatchRepo: IMatchRepo = {
  getMatchesByTournamentIdAndSex,
  getMatchesNotAnnouncedByTournamentId,
  createMatch,
};
