import { Region } from "../model/region";
import { Tournament } from "../model/tournament.model";

export type ITournamentRepo = {
  getTournaments: () => Tournament[];
  getTournamentsByRegion: (region: Region) => Tournament[];
  getTournamentById: (id: string) => Tournament;
  createTournament: (tournament: Tournament) => void;
};
