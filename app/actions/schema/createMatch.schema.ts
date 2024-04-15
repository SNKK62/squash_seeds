import { z } from "zod";

export const scoreSchema = z.object({
  winnerScore: z.number().gte(0),
  loserScore: z.number().gte(0),
});

export const createMatchSchema = z.object({
  winnerId: z.string(),
  loserId: z.string(),
  isDefo: z.preprocess((input) => JSON.parse(`${input}`), z.boolean()),
  matchMetaId: z.string(),
  gameCount: scoreSchema,
  scores: z.array(scoreSchema),
});
