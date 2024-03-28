import { Seed } from "../model/seed.model";
import { Sex } from "../model/sex";

export type ISeedRepo = {
  getSeedsBySex: (sex: Sex) => Seed[];
  getSeedById: (id: string) => Seed;
  createSeed: (seed: Seed) => void;
};
