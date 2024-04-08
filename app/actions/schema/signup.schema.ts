import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  grade: z.number().gte(1).lte(4),
  universityId: z.number(),
  role: z.string(),
  region: z.string(),
  email: z.string().email(),
  password: z.string(),
});
