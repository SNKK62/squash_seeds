import { Region } from "../model/region";
import { University } from "../model/university.model";

export type IUniversityRepo = {
  getUniversities: () => University[];
  getUniversitiesByRegion: (region: Region) => University[];
  getUniversityById: (id: number) => University;
};
