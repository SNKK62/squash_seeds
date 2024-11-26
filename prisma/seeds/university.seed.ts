import { PrismaClient } from "@prisma/client";

import data from "../data/prod/universities.json";

export const setUniversityData = async (prisma: PrismaClient) => {
  try {
    // fetch existing universities
    const existingUniversities = await prisma.university.findMany();
    const existingIds = existingUniversities.map((university) => university.id);

    // add new universities
    for (const university of data) {
      if (!existingIds.includes(university.id)) {
        await prisma.university.create({
          data: {
            id: university.id,
            name: university.name,
            shortName: university.shortName,
            region: university.region,
          },
        });
      }
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};
