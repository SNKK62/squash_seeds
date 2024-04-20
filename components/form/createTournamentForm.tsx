"use client";
import { FieldMetadata, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import React from "react";
import { useFormState } from "react-dom";
import { z } from "zod";

import { Warn } from "@/components/form/warn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectList } from "@/components/ui/selectList";

import {
  createMatchMetaSchema,
  createTournamentSchema,
} from "@actions/schema/createTournament.schema";
import { createTournamentAction } from "@actions/tournaments/createTournament.action";

type CreateMatchMetasFormProps = {
  matchMetas: FieldMetadata<z.infer<typeof createMatchMetaSchema>>[];
  RemoveButton: ({ index }: { index: number }) => React.JSX.Element;
};

const CreateMatchMetasForm = ({
  RemoveButton,
  matchMetas,
}: CreateMatchMetasFormProps) => {
  const sexLabels = [
    {
      value: "男子",
      label: "男子",
    },
    {
      value: "女子",
      label: "女子",
    },
  ];
  return (
    <div>
      {matchMetas.map((matchMeta, i) => {
        const matchMetaFields = matchMeta.getFieldset();
        return (
          <div
            key={matchMeta.id}
            className="my-4 rounded-2xl border border-black p-4"
          >
            <div>
              <Label htmlFor={matchMetaFields.type.id}>試合種別</Label>
              <Input type="text" name={matchMetaFields.type.name} />
              <Warn>{matchMetaFields.type.errors}</Warn>
            </div>
            <div>
              <Input
                type="hidden"
                name={matchMetaFields.isRated.name}
                value="true"
              />
              <Warn>{matchMetaFields.isRated.errors}</Warn>
            </div>
            <div>
              <Label htmlFor={matchMetaFields.sex.id}>性別</Label>
              <SelectList
                id={matchMetaFields.sex.id}
                name={matchMetaFields.sex.name}
                dataList={sexLabels}
                label={"性別"}
              />
              <Warn>{matchMetaFields.sex.errors}</Warn>
            </div>
            <RemoveButton index={i} />
          </div>
        );
      })}
    </div>
  );
};

export const CreateTournamentForm = () => {
  const [lastResult, action] = useFormState(createTournamentAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      console.log(parseWithZod(formData, { schema: createTournamentSchema }));
      return parseWithZod(formData, { schema: createTournamentSchema });
    },
    shouldValidate: "onBlur",
  });

  const matchMetas = fields.matchMetas.getFieldList();

  return (
    <div className="mt-4">
      <div className="p-4 text-center text-3xl font-bold">大会情報登録</div>
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
          <Label htmlFor={fields.name.id}>大会名</Label>
          <Input id={fields.name.id} type="text" name={fields.name.name} />
          <Warn>{fields.name.errors}</Warn>
        </div>
        <div>
          <Input type="hidden" name={fields.region.name} value="関東" />
        </div>
        <div>
          <Label htmlFor={fields.beginAt.id}>開始日</Label>
          <Input
            type="text"
            placeholder="ex) 2000-02-28"
            id={fields.beginAt.id}
            name={fields.beginAt.name}
          />
          <Warn>{fields.beginAt.errors}</Warn>
        </div>
        <div>
          <Label htmlFor={fields.endAt.id}>終了日</Label>
          <Input
            type="text"
            id={fields.endAt.id}
            placeholder="ex) 2000-03-01"
            name={fields.endAt.name}
          />
          <Warn>{fields.endAt.errors}</Warn>
        </div>
        <div>
          <Input type="hidden" name={fields.isTeam.name} value="true" />
        </div>
        <CreateMatchMetasForm
          matchMetas={
            matchMetas as FieldMetadata<z.infer<typeof createMatchMetaSchema>>[]
          }
          RemoveButton={({ index }: { index: number }) => {
            return (
              <Button
                {...form.remove.getButtonProps({
                  name: fields.matchMetas.name,
                  index,
                })}
                variant="destructive"
              >
                項目を削除
              </Button>
            );
          }}
        />
        <Button
          {...form.insert.getButtonProps({
            name: fields.matchMetas.name,
          })}
          variant="secondary"
        >
          試合情報追加
        </Button>
        <div className="flex justify-center">
          <Button className="my-4" variant="default">
            大会を開催する
          </Button>
        </div>
      </form>
    </div>
  );
};
