import { Gakuren, Role } from "../model/gakuren.model";
import { Region } from "../model/region";

type AuthData = {
  email: string;
  hashedPassword: string;
  salt: string;
  hashedSessionToken: string;
};

type GakurenWithAuthData = {
  gakuren: Gakuren;
  authData: AuthData;
};

export type createGakurenInput = {
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
  createGakuren: (input: createGakurenInput) => Promise<void>;
};
