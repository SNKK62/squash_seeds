import { Match as DBMatch, Tournament as DBTournament } from "@prisma/client";

import { convertToGakuren, DBGakurenWithUniversity } from "./gakuren";
import { convertToMatchMeta, DBMatchMetaWithTournament } from "./matchMeta";
import { convertToPlayer, DBPlayerWithUniversityAndTournament } from "./player";
import { convertToTournament } from "./tournament";

import { Match, Score } from "@model/match.model";

type ScoreIndexKey =
  | `winnerGame1Score`
  | `winnerGame2Score`
  | `winnerGame3Score`
  | `winnerGame4Score`
  | `winnerGame5Score`
  | `loserGame1Score`
  | `loserGame2Score`
  | `loserGame3Score`
  | `loserGame4Score`
  | `loserGame5Score`;

type DBMatchWithData = DBMatch & {
  winner: DBPlayerWithUniversityAndTournament;
  loser: DBPlayerWithUniversityAndTournament;
  createdByGakuren: DBGakurenWithUniversity;
  matchMeta: DBMatchMetaWithTournament;
  tournament: DBTournament;
};

export const convertToMatch = (dbMatch: DBMatchWithData): Match => {
  const winner = convertToPlayer(dbMatch.winner);
  const loser = convertToPlayer(dbMatch.loser);
  const createdBy = convertToGakuren(dbMatch.createdByGakuren);
  const tournament = convertToTournament(dbMatch.tournament);
  const matchMeta = convertToMatchMeta(dbMatch.matchMeta);

  const gameCount = new Score(dbMatch.winnerGameCount, dbMatch.loserGameCount);
  const gameScores = [];

  const MAX_GAME_COUNT = 5;

  for (let i = 1; i <= MAX_GAME_COUNT; i++) {
    const winnerKey = `winnerGame${i}Score` as ScoreIndexKey;
    const loserKey = `loserGame${i}Score` as ScoreIndexKey;
    if (
      typeof dbMatch[winnerKey] === "number" &&
      typeof dbMatch[loserKey] === "number"
    ) {
      gameScores.push(
        new Score(dbMatch[winnerKey] as number, dbMatch[loserKey] as number)
      );
    }
  }

  return new Match(
    dbMatch.id,
    winner,
    loser,
    tournament,
    gameCount,
    gameScores,
    createdBy,
    dbMatch.createdAt,
    matchMeta,
    dbMatch.isDefo,
    dbMatch.isAnnounced
  );
};
