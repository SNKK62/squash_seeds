import { University } from "@model/university.model";

export type IUniversityRepo = {
  getAllUniversities: () => Promise<University[]>;
};
