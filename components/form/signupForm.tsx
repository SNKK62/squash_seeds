"use client";

import { useForm, useInputControl } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import { useMemo } from "react";
import { useFormState } from "react-dom";

import { Warn } from "@/components/form/warn";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import type { ComboboxLabel } from "@/components/ui/combobox.d";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signupAction } from "@actions/auth/signup.action";
import { signupSchema } from "@actions/schema/signup.schema";
import { University, UniversityJSON } from "@model/university.model";

interface SignupFormProps {
  universitiesJson: UniversityJSON[];
}

export function SignupForm({ universitiesJson }: SignupFormProps) {
  const [lastResult, action] = useFormState(signupAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      console.log(parseWithZod(formData, { schema: signupSchema }));
      return parseWithZod(formData, { schema: signupSchema });
    },
    shouldValidate: "onBlur",
  });
  const universityControl = useInputControl(fields.universityId);

  const universities = useMemo<University[]>(() => {
    return universitiesJson.map((universityJson) => {
      return University.fromJSON(universityJson);
    });
  }, [universitiesJson]);

  const universityLabels = useMemo<ComboboxLabel[]>(() => {
    return universities.map((university) => {
      return {
        key: university.id.toString(),
        value: university.name,
        label: university.name,
      };
    });
  }, [universities]);

  return (
    <>
      <div className="mt-4">
        <div className="p-4 text-center text-3xl font-bold">学連員登録</div>
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
            <Label htmlFor={fields.lastName.id}>苗字</Label>
            <Input
              type="text"
              id={fields.lastName.id}
              name={fields.lastName.name}
              className="block"
            />
            <Warn>{fields.lastName.errors}</Warn>
          </div>
          <div>
            <Label htmlFor={fields.firstName.id}>名前</Label>
            <Input
              type="text"
              id={fields.firstName.id}
              name={fields.firstName.name}
            />
            <Warn>{fields.firstName.errors}</Warn>
          </div>
          <div>
            <div className="flex gap-4">
              <Label className="flex items-center" htmlFor={fields.grade.id}>
                学年
              </Label>
              <Input
                className="inline w-16"
                type="number"
                id={fields.grade.id}
                name={fields.grade.name}
              />
            </div>
            <Warn>{fields.grade.errors}</Warn>
          </div>
          <div>
            <Label className="mr-4" htmlFor={fields.universityId.id}>
              大学
            </Label>
            <Combobox
              id={fields.universityId.id}
              dataList={universityLabels}
              control={universityControl}
              label="University"
            />
            <Warn>{fields.universityId.errors}</Warn>
          </div>
          <div>
            <Input type="hidden" value="普通" name={fields.role.name} />
          </div>
          <div>
            <Input type="hidden" value="関東" name={fields.region.name} />
          </div>
          <div>
            <Label htmlFor={fields.email.id}>Email</Label>
            <Input id={fields.email.id} type="email" name={fields.email.name} />
            <Warn>{fields.email.errors}</Warn>
          </div>
          <div>
            <Label htmlFor={fields.password.id}>Password</Label>
            <Input
              type="password"
              id={fields.password.id}
              name={fields.password.name}
            />
            <Warn>{fields.password.errors}</Warn>
          </div>
          <div className="flex justify-center">
            <Button variant="default">Signup</Button>
          </div>
        </form>
      </div>
      <div className="mb-8 flex justify-center">
        <Link href="/auth/login" className="text-blue-500 underline">
          アカウントをお持ちの方はこちら
        </Link>
      </div>
    </>
  );
}
