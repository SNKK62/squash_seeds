import { Person } from "@model/person.abstract";
import { Region } from "@model/region";
import { University } from "@model/university.model";

const roleNames = ["幹部", "普通"] as const;

export type Role = (typeof roleNames)[number];

export const isRole = (arg: any): arg is Role => {
  return roleNames.includes(arg);
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
}
