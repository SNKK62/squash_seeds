import { Region } from "@model/region";
import { Tournament } from "@model/tournament.model";

export type CreateTournamentInput = {
  name: string;
  region: Region;
  beginAt: string;
  endAt: string;
  isTeam: boolean;
};

export type ITournamentRepo = {
  getOpenTournamentByRegion: (region: Region) => Promise<Tournament>;
  createTournament: (input: CreateTournamentInput) => Promise<Tournament>;
};
