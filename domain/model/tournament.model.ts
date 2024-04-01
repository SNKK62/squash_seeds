import { Region } from "@model/region";

export class Tournament {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly region: Region,
    public readonly isOpen: boolean,
    public readonly isTeam: boolean,
    public readonly beginAt: string,
    public readonly endAt: string
  ) {}
}
