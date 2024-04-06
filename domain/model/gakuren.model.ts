import { Person } from "@model/person.abstract";
import { Region } from "@model/region";
import { University, UniversityJSON } from "@model/university.model";

const roleNames = ["幹部", "普通"] as const;

export type Role = (typeof roleNames)[number];

export const isRole = (arg: any): arg is Role => {
  return roleNames.includes(arg);
};

export type GakurenJSON = {
  id: string;
  firstName: string;
  lastName: string;
  grade: number;
  university: UniversityJSON;
  role: Role;
  region: Region;
};

export class Gakuren extends Person {
  constructor(
    id: string,
    firstName: string,
    lastName: string,
    grade: number,
    university: University,
    public readonly role: Role,
    public readonly region: Region
  ) {
    super(id, firstName, lastName, grade, university);
  }

  static fromJSON(json: GakurenJSON): Gakuren {
    return new Gakuren(
      json.id,
      json.firstName,
      json.lastName,
      json.grade,
      University.fromJSON(json.university),
      json.role,
      json.region
    );
  }
}
