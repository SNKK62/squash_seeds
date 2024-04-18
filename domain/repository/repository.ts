import { IMatchRepo } from "./match.repo";
import { IMatchMetaRepo } from "./matchMeta.repo";
import { IPlayerRepo } from "./player.repo";
import { ITournamentRepo } from "./tournament.repo";
import { IUniversityRepo } from "./university.repo";

import { IGakurenRepo } from "@repository/gakuren.repo";

export type Repo = {
  gakuren: IGakurenRepo;
  player: IPlayerRepo;
  match: IMatchRepo;
  matchMeta: IMatchMetaRepo;
  university: IUniversityRepo;
  tournament: ITournamentRepo;
};
