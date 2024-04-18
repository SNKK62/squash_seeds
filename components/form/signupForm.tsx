"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signupAction } from "@actions/auth/signup.action";
import { signupSchema } from "@actions/schema/signup.schema";

export function SignupForm() {
  const [lastResult, action] = useFormState(signupAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signupSchema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <div className="min-w-svw mt-4">
      <div className="p-4 text-center text-3xl font-bold">学連員登録</div>
      <form
        className="m-auto min-w-fit max-w-md space-y-2 p-4"
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        noValidate
      >
        <ul>{form.errors?.map((error) => <li key={error}>{error}</li>)}</ul>
        <div>
          <Label htmlFor={fields.lastName.id}>苗字</Label>
          <Input type="text" name={fields.lastName.name} className="block" />
          <div>{fields.lastName.errors}</div>
        </div>
        <div>
          <Label htmlFor={fields.firstName.id}>名前</Label>
          <Input type="text" name={fields.firstName.name} />
          <div>{fields.firstName.errors}</div>
        </div>
        <div>
          <div className="flex gap-4">
            <Label className="flex items-center" htmlFor={fields.grade.id}>
              学年
            </Label>
            <Input
              className="inline w-12"
              type="number"
              name={fields.grade.name}
            />
          </div>

          <div>{fields.grade.errors}</div>
        </div>
        <div>
          <Label htmlFor={fields.universityId.id}>大学</Label>
          <Input type="number" name={fields.universityId.name} />
          <div>{fields.universityId.errors}</div>
        </div>
        <div>
          <Input type="hidden" value="普通" name={fields.role.name} />
        </div>
        <div>
          <Input type="hidden" value="関東" name={fields.region.name} />
        </div>
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
          <Button variant="default">SignUp</Button>
        </div>
      </form>
    </div>
  );
}
