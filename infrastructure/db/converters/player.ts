import { Player as DBPlayer, University as DBUniversity } from "@prisma/client";
import { Player } from "@model/player.model";
import { isSex } from "@model/sex";
import { convertToUniversity } from "./university";

export type DBPlayerWithUniversity = DBPlayer & {
  university: DBUniversity;
};

export const convertToPlayer = (dbPlayer: DBPlayerWithUniversity): Player => {
  if (!isSex(dbPlayer.sex)) {
    throw new Error("invalid Sex");
  }
  const university = convertToUniversity(dbPlayer.university);
  return new Player(
    dbPlayer.id,
    dbPlayer.firstName,
    dbPlayer.lastName,
    dbPlayer.grade,
    university,
    dbPlayer.sex,
    dbPlayer.isRetired
  );
};
