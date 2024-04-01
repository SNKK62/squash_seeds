import { University as DBUniversity } from "@prisma/client";
import { University } from "@/domain/model/university.model";
import { isRegion } from "@/domain/model/region";

export const convertToUniversity = (university: DBUniversity): University => {
  if (!isRegion(university.region)) {
    throw new Error("Invalid region");
  }

  return new University(
    university.id,
    university.name,
    university.shortName,
    university.region
  );
};
