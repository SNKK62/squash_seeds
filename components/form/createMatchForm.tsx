"use client";
import { FieldMetadata, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createMatchAction } from "@actions/matches/createMatch.action";
import {
  createMatchSchema,
  scoreSchema,
} from "@actions/schema/createMatch.schema";

type CreateScoreFormProps = {
  score: FieldMetadata<z.infer<typeof scoreSchema>>;
};
const CreateScoreForm = ({ score }: CreateScoreFormProps) => {
  const scoreFields = score.getFieldset();

  return (
    <>
      <Input
        type="number"
        className="aspect-square w-10"
        name={scoreFields.winnerScore.name}
      />
      <div className="font-extrabold">-</div>
      <Input
        type="number"
        className="aspect-square w-10"
        name={scoreFields.loserScore.name}
      />
    </>
  );
};

type CreateGameScoresFormProps = {
  scores: FieldMetadata<z.infer<typeof scoreSchema>>[];
  getRemoveButtonProps: any;
  scoresFieldName: any;
};

const CreateGameScoresForm = ({
  scores,
  getRemoveButtonProps,
  scoresFieldName,
}: CreateGameScoresFormProps) => {
  return (
    <ul>
      {scores.map((score, i) => {
        return (
          <div
            key={i}
            className="my-4 flex items-center justify-center gap-x-4"
          >
            <Label htmlFor={score.id}>{i + 1}セット目</Label>
            <CreateScoreForm score={score} />
            <Button
              {...getRemoveButtonProps({ name: scoresFieldName, index: i })}
            >
              削除
            </Button>
          </div>
        );
      })}
    </ul>
  );
};

export const CreateMatchForm = () => {
  const [lastResult, action] = useFormState(createMatchAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createMatchSchema });
    },
    shouldValidate: "onBlur",
  });

  const scores = fields.scores.getFieldList();

  return (
    <div className="min-w-svw mt-4">
      <div className="p-4 text-center text-3xl font-bold">試合結果記入</div>
      <form
        className="m-auto min-w-fit max-w-md space-y-2 p-4"
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        noValidate
      >
        <ul>{form.errors?.map((error) => <li key={error}>{error}</li>)}</ul>
        <div>
          <Label htmlFor={fields.matchMetaId.id}>試合種別</Label>
          <Input type="text" name={fields.matchMetaId.name} />
          <div className="h-8">{fields.matchMetaId.errors}</div>
        </div>
        <div>
          <Label htmlFor={fields.winnerId.id}>勝者</Label>
          <Input type="text" name={fields.winnerId.name} />
          <div className="h-8">{fields.winnerId.errors}</div>
        </div>
        <div>
          <Label htmlFor={fields.loserId.id}>敗者</Label>
          <Input type="text" name={fields.loserId.name} />
          <div className="h-8">{fields.loserId.errors}</div>
        </div>
        <div>
          {/* <Label htmlFor={fields.isDefo.id}>デフォしたかどうか</Label> */}
          <Input type="hidden" name={fields.isDefo.name} value="false" />
          <div>{fields.isDefo.errors}</div>
        </div>
        <div className="my-4 flex items-center justify-center gap-x-4">
          <Label htmlFor={fields.gameCount.id}>ゲームカウント</Label>
          <CreateScoreForm score={fields.gameCount} />
        </div>
        <CreateGameScoresForm
          scores={scores}
          getRemoveButtonProps={form.remove.getButtonProps}
          scoresFieldName={fields.scores.name}
        />
        {scores.length < 5 && (
          <Button
            {...form.insert.getButtonProps({
              name: fields.scores.name,
            })}
          >
            ゲーム追加
          </Button>
        )}
        <div className="flex justify-center">
          <Button variant="default">登録</Button>
        </div>
      </form>
    </div>
  );
};
