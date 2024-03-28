import { MatchMeta } from "../model/matchMeta.model";

export type IMatchMetaRepo = {
  getMatchMetas: () => MatchMeta[];
  getMatchMetaById: (id: string) => MatchMeta;
  createMatchMeta: (matchMeta: MatchMeta) => void;
};
