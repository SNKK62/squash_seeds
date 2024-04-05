import { Region } from "@model/region";

export type DateString = `${number}-${number}-${number}`;

export const isDateString = (arg: any): arg is DateString => {
  const [year, month, day] = arg.split("-").map(Number);
  const MIN_YEAR = 2000;
  const MAX_YEAR = 9999;
  const MIN_MONTH = 1;
  const MAX_MONTH = 12;
  const MIN_DAY = 1;
  const MAX_DAY = 31;

  return (
    year >= MIN_YEAR &&
    year <= MAX_YEAR &&
    month >= MIN_MONTH &&
    month <= MAX_MONTH &&
    day >= MIN_DAY &&
    day <= MAX_DAY
  );
};

export class Tournament {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly region: Region,
    public readonly isOpen: boolean,
    public readonly isTeam: boolean,
    public readonly beginAt: DateString,
    public readonly endAt: DateString
  ) {}

  static fromJSON(json: any): Tournament {
    return new Tournament(
      json.id,
      json.name,
      json.region,
      json.isOpen,
      json.isTeam,
      json.beginAt,
      json.endAt
    );
  }
}
