import { IUniversityRepo } from "@/domain/repository/university.repo";
import { prisma } from "@db/client";
import { convertToUniversity } from "../../converters/university";
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
