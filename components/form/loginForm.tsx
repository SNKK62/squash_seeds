"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import { Warn } from "@/components/form/warn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loadingButton";

import { loginAction } from "@actions/auth/login.action";
import { loginSchema } from "@actions/schema/login.schema";

export function LoginForm() {
  const [lastResult, action] = useFormState(loginAction, undefined);
  const [loading, setLoading] = useState(false);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: "onSubmit",
  });

  useEffect(() => {
    if (form.errors || fields.email.errors || fields.password.errors) {
      setLoading(false);
    }
  }, [form.errors, fields.email.errors, fields.password.errors]);

  return (
    <>
      <div className="mt-4">
        <div className="pt-4 text-center text-3xl font-bold">ログイン画面</div>
        <form
          className="m-auto p-4"
          id={form.id}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            setLoading(true);
            form.onSubmit(e);
          }}
          action={action}
          noValidate
        >
          <ul className="pb-4 text-center">
            {form.errors?.map((error) => (
              <li key={error}>
                <Warn>{error}</Warn>
              </li>
            ))}
          </ul>
          <div className="m-auto max-w-lg px-4">
            <div>
              <Label htmlFor={fields.email.id}>Email</Label>
              <Input
                type="email"
                id={fields.email.id}
                name={fields.email.name}
              />
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
              <LoadingButton loading={loading} type="submit" variant="default">
                Login
              </LoadingButton>
            </div>
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
