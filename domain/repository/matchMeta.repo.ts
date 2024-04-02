import { Sex } from "../model/sex";

export type CreateMatchMetaInput = {
  type: string;
  isRated: boolean;
  sex: Sex;
  tournamentId: string;
};

export type IMatchMetaRepo = {
  createMatchMeta: (input: CreateMatchMetaInput) => Promise<void>;
};
