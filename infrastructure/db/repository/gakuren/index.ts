import {
  CreateGakurenInput,
  GakurenWithAuthData,
  IGakurenRepo,
} from "@repository/gakuren.repo";
import { prisma } from "@/infrastructure/db/client";
import { convertToGakuren } from "@db/converters/gakuren";

import { v4 as uuid } from "uuid";
import { Gakuren } from "@model/gakuren.model";

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
        hashedSessionToken: dbGakuren.sessionToken,
      },
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getGakurenById = async (id: string): Promise<Gakuren> => {
  try {
    const dbGakuren = await prisma.gakuren.findUnique({
      where: {
        id,
      },
      include: {
        university: true,
      },
    });
    if (!dbGakuren) {
      throw new Error("Gakuren not found");
    }
    return convertToGakuren(dbGakuren);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const createGakuren = async (input: CreateGakurenInput): Promise<Gakuren> => {
  const sessionToken = uuid();

  try {
    const gakuren = await prisma.gakuren.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        grade: input.grade,
        universityId: input.universityId,
        role: input.role,
        region: input.region,
        email: input.email,
        password: input.password,
        sessionToken,
      },
      include: {
        university: true,
      },
    });
    return convertToGakuren(gakuren);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const GakurenRepo: IGakurenRepo = {
  getGakurenWithAuthDataByEmail,
  getGakurenById,
  createGakuren,
};
