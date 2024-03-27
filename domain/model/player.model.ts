import { Person } from "./person.abstract";
import { Sex } from "./sex";
import { University } from "./university.model";

export class Player extends Person {
  constructor(
    id: string,
    firstName: string,
    lastName: string,
    grade: number,
    university: University,
    public readonly sex: Sex,
    public readonly isRetired: boolean
  ) {
    super(id, firstName, lastName, grade, university);
  }
}
