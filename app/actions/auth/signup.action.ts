"use server";
import "server-only";
import { parseWithZod } from "@conform-to/zod";

import { repository } from "@registry/repository";
import { SignupUsecase } from "@usecase/auth/signup.usecase";
import { Role } from "@model/gakuren.model";
import { Region } from "@model/region";
import { cookies } from "next/headers";
import { signupSchema } from "@actions/schema/signup.schema";

export async function signupAction(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: signupSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  console.log(submission.payload);

  const input = {
    lastName: formData.get("lastName") as string,
    firstName: formData.get("firstName") as string,
    universityId: Number(formData.get("universityId")),
    grade: Number(formData.get("grade")),
    role: formData.get("role") as Role,
    region: formData.get("region") as Region,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  try {
    const usecase = new SignupUsecase(repository);
    const gakurenWithAuthData = await usecase.execute(input);

    const cookiesStore = cookies();
    cookiesStore.set("email", gakurenWithAuthData.authData.email);
    cookiesStore.set("password", input.password);
    return;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
