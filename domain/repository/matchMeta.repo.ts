import { Sex } from "../model/sex";

type CreateMatchMetaInput = {
  name: string;
  isRated: Boolean;
  sex: Sex;
  tournamentId: string;
};

export type IMatchMetaRepo = {
  createMatchMeta: (input: CreateMatchMetaInput) => Promise<void>;
};
