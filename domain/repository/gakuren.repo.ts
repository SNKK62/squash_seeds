import { Gakuren, Role } from "@model/gakuren.model";
import { Region } from "@model/region";

type AuthData = {
  email: string;
  hashedPassword: string;
};

export type GakurenWithAuthData = {
  gakuren: Gakuren;
  authData: AuthData;
};

export type CreateGakurenInput = {
  firstName: string;
  lastName: string;
  grade: number;
  universityId: number;
  role: Role;
  region: Region;
  email: string;
  password: string;
};

export type IGakurenRepo = {
  getGakurenWithAuthDataByEmail: (
    email: string
  ) => Promise<GakurenWithAuthData>;
  getGakurenById: (id: string) => Promise<Gakuren>;
  createGakuren: (input: CreateGakurenInput) => Promise<Gakuren>;
};
