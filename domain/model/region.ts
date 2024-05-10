const regionNames = [
  "全日本",
  "北海道",
  "東北",
  "関東",
  "中部",
  "関西",
  "九州",
] as const;

export type Region = (typeof regionNames)[number];

export const isRegion = (arg: unknown): arg is Region => {
  return regionNames.some((region) => region === arg);
};
