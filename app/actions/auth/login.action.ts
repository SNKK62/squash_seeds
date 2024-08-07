"use server";
import "server-only";
import { parseWithZod } from "@conform-to/zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { loginSchema } from "@actions/schema/login.schema";
import { repository } from "@registry/repository";
import { LoginUsecase } from "@usecase/auth/login.usecase";

export async function loginAction(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  console.log(submission.payload);

  try {
    const usecase = new LoginUsecase(repository);
    const gakurenWithAuthData = await usecase.execute(
      formData.get("email") as string,
      formData.get("password") as string
    );

    const cookiesStore = cookies();
    cookiesStore.set("email", gakurenWithAuthData.authData.email);
    cookiesStore.set("password", formData.get("password") as string);
  } catch (e) {
    console.log(e);
    return submission.reply({
      formErrors: [String(e)],
    });
  }
  redirect("/tournament/matches/notAnnounced");
}
