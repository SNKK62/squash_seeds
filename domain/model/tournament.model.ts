import { Region } from "@model/region";

export type DateString = `${number}-${number}-${number}`;

export const isDateString = (arg: string): arg is DateString => {
  const [year, month, day] = arg.split("-").map(Number);
  const MIN_YEAR = 2000;
  const MAX_YEAR = 9999;
  const MIN_MONTH = 1;
  const MAX_MONTH = 12;
  const MIN_DAY = 1;
  const MAX_DAY = 31;

  return (
    !!year &&
    !!month &&
    !!day &&
    year >= MIN_YEAR &&
    year <= MAX_YEAR &&
    month >= MIN_MONTH &&
    month <= MAX_MONTH &&
    day >= MIN_DAY &&
    day <= MAX_DAY
  );
};

export type TournamentJSON = {
  id: string;
  name: string;
  region: Region;
  isOpen: boolean;
  isTeam: boolean;
  beginAt: DateString;
  endAt: DateString;
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

  static fromJSON(json: TournamentJSON): Tournament {
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
