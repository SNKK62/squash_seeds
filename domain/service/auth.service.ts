import { Gakuren } from "@model/gakuren.model";
import { CreateGakurenInput, IGakurenRepo } from "@repository/gakuren.repo";
import { createHash } from "crypto";
import { Repo } from "@repository/repository";

export const hashString = (str: string): string => {
  const hash = createHash("sha256");
  hash.update(str);
  return hash.digest("hex");
};

export class AuthService {
  private readonly gakurenRepo: IGakurenRepo;

  constructor(repo: Repo) {
    this.gakurenRepo = repo.gakuren;
  }

  public async login(email: string, password: string): Promise<Gakuren> {
    try {
      const gakurenWithAuthData =
        await this.gakurenRepo.getGakurenWithAuthDataByEmail(email);

      const hashedPassword = hashString(
        password + gakurenWithAuthData.authData.salt
      );

      if (gakurenWithAuthData.authData.hashedPassword !== hashedPassword) {
        throw new Error("Invalid password");
      }
      return gakurenWithAuthData.gakuren;
    } catch (e) {
      throw e;
    }
  }

  public async signup(input: CreateGakurenInput): Promise<Gakuren> {
    try {
      await this.gakurenRepo.createGakuren(input);
      return await this.gakurenRepo
        .getGakurenWithAuthDataByEmail(input.email)
        .then((gakurenWithAuthData) => gakurenWithAuthData.gakuren);
    } catch (e) {
      throw e;
    }
  }

  public async checkSessionToken(
    email: string,
    sessionToken: string
  ): Promise<Boolean> {
    try {
      const gakurenWithAuthData =
        await this.gakurenRepo.getGakurenWithAuthDataByEmail(email);

      const hashedSessionToken = hashString(
        sessionToken + gakurenWithAuthData.authData.salt
      );

      return (
        hashedSessionToken === gakurenWithAuthData.authData.hashedSessionToken
      );
    } catch (e) {
      throw e;
    }
  }
}
