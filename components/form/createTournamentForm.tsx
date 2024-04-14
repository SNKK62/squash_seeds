"use client";
import { parseWithZod } from "@conform-to/zod";
import { FieldMetadata, useForm } from "@conform-to/react";
import { useFormState } from "react-dom";
import { createTournamentAction } from "@actions/tournaments/createTournament.action";
import {
  createMatchMetaSchema,
  createTournamentSchema,
} from "@actions/schema/createTournament.schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";

type CreateMatchMetasFormProps = {
  matchMetas: FieldMetadata<z.infer<typeof createMatchMetaSchema>>[];
};

const CreateMatchMetasForm = ({ matchMetas }: CreateMatchMetasFormProps) => {
  return (
    <ul>
      {matchMetas.map((matchMeta) => {
        const matchMetaFields = matchMeta.getFieldset();
        return (
          <>
            <div>
              <Label htmlFor={matchMetaFields.type.id}>試合種別</Label>
              <Input type="text" name={matchMetaFields.type.name} />
              <div>{matchMetaFields.type.errors}</div>
            </div>
            <div>
              <Input
                type="hidden"
                name={matchMetaFields.isRated.name}
                value="true"
              />
              <div>{matchMetaFields.isRated.errors}</div>
            </div>
            <div>
              <Label htmlFor={matchMetaFields.sex.id}>性別</Label>
              <Input type="text" name={matchMetaFields.sex.name} />
              <div>{matchMetaFields.sex.errors}</div>
            </div>
          </>
        );
      })}
    </ul>
  );
};

export const CreateTournamentForm = () => {
  const [lastResult, action] = useFormState(createTournamentAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createTournamentSchema });
    },
    shouldValidate: "onBlur",
  });

  const matchMetas = fields.matchMetas.getFieldList();

  return (
    <div className="min-w-svw mt-4">
      <div className="text-center font-bold text-3xl p-4">大会情報登録</div>
      <form
        className="max-w-md min-w-fit m-auto p-4 space-y-2"
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        noValidate
      >
        <ul>{form.errors?.map((error) => <li key={error}>{error}</li>)}</ul>
        <div>
          <Label htmlFor={fields.name.id}>大会名</Label>
          <Input type="text" name={fields.name.name} />
          <div>{fields.name.errors}</div>
        </div>
        <div>
          <Input hidden type="text" name={fields.region.name} value="関東" />
          <div>{fields.region.errors}</div>
        </div>
        <div>
          <Label htmlFor={fields.beginAt.id}>開始日</Label>
          <Input type="text" name={fields.beginAt.name} />
          <div>{fields.beginAt.errors}</div>
        </div>
        <div>
          <Label htmlFor={fields.endAt.id}>終了日</Label>
          <Input type="text" name={fields.endAt.name} />
          <div>{fields.endAt.errors}</div>
        </div>
        <div>
          <Input type="hidden" name={fields.isTeam.name} value="true" />
          <div>{fields.isTeam.errors}</div>
        </div>
        <CreateMatchMetasForm
          matchMetas={
            matchMetas as FieldMetadata<z.infer<typeof createMatchMetaSchema>>[]
          }
        />
        <Button
          {...form.insert.getButtonProps({
            name: fields.matchMetas.name,
          })}
        >
          試合情報追加
        </Button>
        <div className="flex justify-center">
          <Button variant="default">登録</Button>
        </div>
      </form>
    </div>
  );
};
