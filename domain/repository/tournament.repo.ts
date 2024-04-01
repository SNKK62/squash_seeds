import { Region } from "@model/region";
import { Tournament } from "@model/tournament.model";

type CreateTournamentInput = {
  name: string;
  region: Region;
  beginAt: String;
  endAt: String;
  isTeam: Boolean;
};

export type ITournamentRepo = {
  getOpenTournamentsByRegion: (region: Region) => Tournament[];
  createTournament: (input: CreateTournamentInput) => Promise<void>;
};
