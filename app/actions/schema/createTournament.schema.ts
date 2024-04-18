import { z } from "zod";

import { isSex } from "@model/sex";

export const createMatchMetaSchema = z.object({
  type: z.string(),
  isRated: z.preprocess((input) => JSON.parse(`${input}`), z.boolean()),
  sex: z.string().refine(isSex, { message: "性別を入力してください" }),
});

export const createTournamentSchema = z.object({
  name: z.string(),
  region: z.string(),
  beginAt: z.string(),
  endAt: z.string(),
  isTeam: z.preprocess((input) => JSON.parse(`${input}`), z.boolean()),
  matchMetas: z.array(createMatchMetaSchema),
});
