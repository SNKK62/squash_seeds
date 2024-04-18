import { IUniversityRepo } from "@/domain/repository/university.repo";

import { convertToUniversity } from "../../converters/university";

import { prisma } from "@db/client";
import { University } from "@model/university.model";

const getAllUniversities = async (): Promise<University[]> => {
  try {
    const dbUniversities = await prisma.university.findMany();

    const universities = dbUniversities.map((dbUniversity) => {
      return convertToUniversity(dbUniversity);
    });

    return universities;
  } catch (e) {
    throw e;
  }
};

export const UniversityRepo: IUniversityRepo = {
  getAllUniversities,
};
