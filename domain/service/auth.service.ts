import {
  CreateGakurenInput,
  GakurenWithAuthData,
  IGakurenRepo,
} from "@repository/gakuren.repo";
import bcrypt from "bcrypt";
import { Repo } from "@repository/repository";

export const hashString = (str: string): string => {
  const saltRounds = 10;
  return bcrypt.hashSync(str, saltRounds);
};

export const compareHash = (str: string, hash: string): boolean => {
  return bcrypt.compareSync(str, hash);
};

export class AuthService {
  private readonly gakurenRepo: IGakurenRepo;

  constructor(repo: Repo) {
    this.gakurenRepo = repo.gakuren;
  }

  public async login(
    email: string,
    password: string
  ): Promise<GakurenWithAuthData> {
    try {
      const gakurenWithAuthData =
        await this.gakurenRepo.getGakurenWithAuthDataByEmail(email);

      if (!compareHash(password, gakurenWithAuthData.authData.hashedPassword)) {
        throw new Error("Invalid password");
      }
      return gakurenWithAuthData;
    } catch (e) {
      throw e;
    }
  }

  public async signup(input: CreateGakurenInput): Promise<GakurenWithAuthData> {
    try {
      const hashedPassword = hashString(input.password);
      await this.gakurenRepo.createGakuren({
        ...input,
        password: hashedPassword,
      });
      return await this.gakurenRepo.getGakurenWithAuthDataByEmail(input.email);
    } catch (e) {
      throw e;
    }
  }

  public async checkSessionToken(
    email: string,
    sessionToken: string
  ): Promise<boolean> {
    try {
      const gakurenWithAuthData =
        await this.gakurenRepo.getGakurenWithAuthDataByEmail(email);

      return compareHash(
        sessionToken,
        gakurenWithAuthData.authData.hashedSessionToken
      );
    } catch (e) {
      throw e;
    }
  }
}
