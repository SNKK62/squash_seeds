import { Player } from "../model/player.model";
import { Sex } from "../model/sex";

export type IPlayerRepo = {
  getPlayers: () => Player[];
  getPlayersBySex: (sed: Sex) => Player[];
  getPlayerById: (id: string) => Player;
  createPlayer: (player: Player) => void;
};
