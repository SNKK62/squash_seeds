import { University } from "@model/university.model";

export abstract class Person {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly grade: number,
    public readonly university: University
  ) {}

  get fullName(): string {
    return `${this.lastName} ${this.firstName}`;
  }

  get lastNameWithUnivShortName(): string {
    return `${this.lastName}(${this.university.shortName})`;
  }

  get fullNameWithUnivShortName(): string {
    return `${this.fullName}(${this.university.shortName})`;
  }

  get fullNameWithUnivName(): string {
    return `${this.fullName}(${this.university.name})`;
  }
}
