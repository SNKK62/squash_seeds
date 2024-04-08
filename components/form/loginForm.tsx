"use client";

import { parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { useFormState } from "react-dom";
import { loginAction } from "@actions/auth/login.action";
import { loginSchema } from "@actions/schema/login.schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <div className="min-w-svw mt-4">
      <div className="text-center font-bold text-3xl p-4">ログイン</div>
      <form
        className="max-w-md min-w-fit m-auto p-4 space-y-2"
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        noValidate
      >
        <div>
          <Label htmlFor={fields.email.id}>Email</Label>
          <Input type="email" name={fields.email.name} />
          <div>{fields.email.errors}</div>
        </div>
        <div>
          <Label htmlFor={fields.password.id}>Password</Label>
          <Input type="password" name={fields.password.name} />
          <div>{fields.password.errors}</div>
        </div>
        <div className="flex justify-center">
          <Button variant="default">Login</Button>
        </div>
      </form>
    </div>
  );
}
