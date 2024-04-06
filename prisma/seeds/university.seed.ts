import { PrismaClient } from "@prisma/client";
import data from "../data/universities.json";

export const setUniversityData = async (prisma: PrismaClient) => {
  try {
    data.forEach(async (university) => {
      await prisma.university.create({
        data: {
          id: university.id,
          name: university.name,
          shortName: university.shortName,
          region: university.region,
        },
      });
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};
