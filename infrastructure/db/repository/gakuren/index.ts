import {
  CreateGakurenInput,
  GakurenWithAuthData,
  IGakurenRepo,
} from "@repository/gakuren.repo";
import { prisma } from "@/infrastructure/db/client";
import { convertToGakuren } from "@db/converters/gakuren";
import { hashString } from "@/domain/service/auth.service";

import { v4 as uuid } from "uuid";

const getGakurenWithAuthDataByEmail = async (
  email: string
): Promise<GakurenWithAuthData> => {
  try {
    const dbGakuren = await prisma.gakuren.findUnique({
      where: {
        email,
      },
      include: {
        university: true,
      },
    });
    if (!dbGakuren) {
      throw new Error("Gakuren not found");
    }
    const gakuren = convertToGakuren(dbGakuren);
    return {
      gakuren,
      authData: {
        email: dbGakuren.email,
        hashedPassword: dbGakuren.password,
        salt: dbGakuren.hashSalt,
        hashedSessionToken: dbGakuren.sessionToken,
      },
    };
  } catch (e) {
    throw e;
  }
};

const createGakuren = async (input: CreateGakurenInput): Promise<void> => {
  const hashSalt = uuid();
  const hashedPassword = hashString(input.password + hashSalt);

  const sessionToken = uuid();

  try {
    await prisma.gakuren.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        grade: input.grade,
        universityId: input.universityId,
        role: input.role,
        region: input.region,
        email: input.email,
        password: hashedPassword,
        hashSalt,
        sessionToken,
      },
    });
  } catch (e) {
    throw e;
  }
};

export const GakurenRepo: IGakurenRepo = {
  getGakurenWithAuthDataByEmail,
  createGakuren,
};
