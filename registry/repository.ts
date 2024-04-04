import { GakurenRepo } from "@db/repository/gakuren";
import { MatchRepo } from "@db/repository/match";
import { MatchMetaRepo } from "@db/repository/matchMeta";
import { PlayerRepo } from "@db/repository/player";
import { TournamentRepo } from "@db/repository/tournament";
import { UniversityRepo } from "@db/repository/university";
import { Repo } from "@repository/repository";

export const repository: Repo = {
  gakuren: GakurenRepo,
  player: PlayerRepo,
  match: MatchRepo,
  matchMeta: MatchMetaRepo,
  university: UniversityRepo,
  tournament: TournamentRepo,
};
