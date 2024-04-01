import { Player } from "@model/player.model";
// import { Sex } from "@model/sex";

// type CreatePlayerInput = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   grade: number;
//   universityId: number;
//   sex: Sex;
// };

export type IPlayerRepo = {
  getPlayersNotRetired: () => Promise<Player>[];
  // TODO: implement createPlayer: (player: CreatePlayerInput) => Promise<void>;
};
