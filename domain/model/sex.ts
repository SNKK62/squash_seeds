const sexValues = ["男子", "女子"] as const;

export type Sex = (typeof sexValues)[number];

export const isSex = (arg: any): arg is Sex => {
  return sexValues.includes(arg);
};
