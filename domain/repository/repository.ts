import { IGakurenRepo } from "@repository/gakuren.repo";
import { IUniversityRepo } from "./university.repo";
import { IMatchMetaRepo } from "./matchMeta.repo";
import { IMatchRepo } from "./match.repo";
import { IPlayerRepo } from "./player.repo";
import { ITournamentRepo } from "./tournament.repo";

export type Repo = {
  gakuren: IGakurenRepo;
  player: IPlayerRepo;
  match: IMatchRepo;
  matchMeta: IMatchMetaRepo;
  university: IUniversityRepo;
  tournament: ITournamentRepo;
};
