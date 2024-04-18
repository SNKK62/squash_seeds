"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";

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
    <div className="min-w-svw mt-4">
      <div className="p-4 text-center text-3xl font-bold">ログイン</div>
      <form
        className="m-auto min-w-fit max-w-md space-y-2 p-4"
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        noValidate
      >
        <ul>{form.errors?.map((error) => <li key={error}>{error}</li>)}</ul>
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
