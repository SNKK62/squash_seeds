const sexValues = ["男子", "女子"] as const;

export type Sex = (typeof sexValues)[number];

export const isSex = (arg: unknown): arg is Sex => {
  return sexValues.some((sex) => sex === arg);
};
