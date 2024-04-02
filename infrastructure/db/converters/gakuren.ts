import { Gakuren, isRole } from "@model/gakuren.model";
import {
  Gakuren as DBGakuren,
  University as DBUniversity,
} from "@prisma/client";
import { convertToUniversity } from "@db/converters/university";
import { isRegion } from "@/domain/model/region";

export type DBGakurenWithUniversity = DBGakuren & {
  university: DBUniversity;
};

export const convertToGakuren = (
  dbGakuren: DBGakurenWithUniversity
): Gakuren => {
  if (!isRole(dbGakuren.role)) {
    throw new Error("Invalid role");
  }
  if (!isRegion(dbGakuren.region)) {
    throw new Error("Invalid region");
  }

  const university = convertToUniversity(dbGakuren.university);

  return new Gakuren(
    dbGakuren.id,
    dbGakuren.firstName,
    dbGakuren.lastName,
    dbGakuren.grade,
    university,
    dbGakuren.role,
    dbGakuren.region
  );
};
