"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import { useFormState } from "react-dom";

import { Warn } from "@/components/form/warn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { loginAction } from "@actions/auth/login.action";
import { loginSchema } from "@actions/schema/login.schema";

export function LoginForm() {
  const [lastResult, action] = useFormState(loginAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <>
      <div className="mt-4">
        <div className="p-4 text-center text-3xl font-bold">ログイン</div>
        <form
          className="m-auto min-w-fit max-w-md space-y-2 p-4"
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
          noValidate
        >
          <ul>
            {form.errors?.map((error) => (
              <li key={error}>
                <Warn>{error}</Warn>
              </li>
            ))}
          </ul>
          <div>
            <Label htmlFor={fields.email.id}>Email</Label>
            <Input type="email" id={fields.email.id} name={fields.email.name} />
            <Warn>{fields.email.errors}</Warn>
          </div>
          <div>
            <Label htmlFor={fields.password.id}>Password</Label>
            <Input
              id={fields.password.id}
              type="password"
              name={fields.password.name}
            />
            <Warn>{fields.password.errors}</Warn>
          </div>
          <div className="flex justify-center">
            <Button variant="default">Login</Button>
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <Link href="/auth/signup" className="text-blue-500 underline">
          初めての方はこちら
        </Link>
      </div>
    </>
  );
}
