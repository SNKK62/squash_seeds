import { Gakuren } from "../model/gakuren.model";

type AuthOptions = {
  email: string;
  password: string;
};

export type IGakurenRepo = {
  getGakurenById: (id: string) => Gakuren;
  createGakuren: (gakuren: Gakuren, authOptions: AuthOptions) => void;
};
