import { Person } from "@model/person.abstract";
import { Sex } from "@model/sex";
import { University } from "@model/university.model";

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

  static fromJSON(json: any): Player {
    return new Player(
      json.id,
      json.firstName,
      json.lastName,
      json.grade,
      University.fromJSON(json.university),
      json.sex,
      json.isRetired
    );
  }
}
