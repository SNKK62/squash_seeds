import { z } from "zod";

export const scoreSchema = z
  .object({
    winnerScore: z.number().gte(0),
    loserScore: z.number().gte(0),
  })
  .optional();

export const updateMatchSchema = z.object({
  id: z.string(),
  winnerId: z.string(),
  loserId: z.string(),
  isDefo: z.string().refine((arg) => arg === "true" || arg === "false"),
  matchMetaId: z.string(),
  gameCount: scoreSchema,
  scores: z.array(scoreSchema),
});
