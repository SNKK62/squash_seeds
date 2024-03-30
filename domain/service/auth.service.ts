import { Gakuren } from "../model/gakuren.model";
import { createGakurenInput, IGakurenRepo } from "../repository/gakuren.repo";
import { createHash } from "crypto";

export class AuthService {
  constructor(private readonly gakurenRepo: IGakurenRepo) {}

  public async login(email: string, password: string): Promise<Gakuren> {
    try {
      const gakurenWithAuthData =
        await this.gakurenRepo.getGakurenWithAuthDataByEmail(email);

      const hash = createHash("sha256");
      hash.update(password + gakurenWithAuthData.authData.salt);
      const hashedPassword = hash.digest("hex");

      if (gakurenWithAuthData.authData.hashedPassword !== hashedPassword) {
        throw new Error("Invalid password");
      }
      return gakurenWithAuthData.gakuren;
    } catch (e) {
      throw e;
    }
  }

  public async signup(input: createGakurenInput): Promise<Gakuren> {
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

      const hash = createHash("sha256");
      hash.update(sessionToken + gakurenWithAuthData.authData.salt);
      const hashedSessionToken = hash.digest("hex");

      return (
        hashedSessionToken === gakurenWithAuthData.authData.hashedSessionToken
      );
    } catch (e) {
      throw e;
    }
  }
}
