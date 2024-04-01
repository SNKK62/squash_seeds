import { University } from "@model/university.model";

export type IUniversityRepo = {
  getUniversities: () => Promise<University[]>;
};
