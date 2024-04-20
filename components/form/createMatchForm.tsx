"use client";
import { FieldMetadata, useForm, useInputControl } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useMemo } from "react";
import { useFormState } from "react-dom";
import { z } from "zod";

import { Warn } from "@/components/form/warn";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { createMatchAction } from "@actions/matches/createMatch.action";
import {
  createMatchSchema,
  scoreSchema,
} from "@actions/schema/createMatch.schema";
import { MatchMeta, MatchMetaJSON } from "@model/matchMeta.model";
import { Player, PlayerJSON } from "@model/player.model";

type CreateScoreFormProps = {
  score: FieldMetadata<z.infer<typeof scoreSchema>>;
};

const CreateScoreForm = ({ score }: CreateScoreFormProps) => {
  const scoreFields = score.getFieldset();

  return (
    <div className="flex items-center gap-1">
      <div className="aspect-square w-16">
        <Input
          id={scoreFields.winnerScore.id}
          type="number"
          name={scoreFields.winnerScore.name}
        />
        <Warn> {scoreFields.winnerScore.errors}</Warn>
      </div>
      <div className="pb-10 text-5xl font-bold">-</div>
      <div className="aspect-square w-16">
        <Input
          id={scoreFields.loserScore.id}
          type="number"
          name={scoreFields.loserScore.name}
        />
        <Warn> {scoreFields.loserScore.errors}</Warn>
      </div>
    </div>
  );
};

type CreateGameScoresFormProps = {
  scores: FieldMetadata<z.infer<typeof scoreSchema>>[];
  RemoveButton: (index: { index: number }) => React.JSX.Element;
};

const CreateGameScoresForm = ({
  scores,
  RemoveButton,
}: CreateGameScoresFormProps) => {
  return (
    <ul>
      {scores.map((score, i) => {
        return (
          <div key={i} className="flex items-center justify-center gap-x-2">
            <div>
              <Label htmlFor={score.id}>{i + 1}セット目</Label>
              <Warn>{""}</Warn>
            </div>

            <CreateScoreForm score={score} />
            <div>
              <RemoveButton index={i} />
              <Warn>{""}</Warn>
            </div>
          </div>
        );
      })}
    </ul>
  );
};

interface CreateMatchFormProps {
  playersJson: PlayerJSON[];
  matchMetasJson: MatchMetaJSON[];
}

export const CreateMatchForm = ({
  playersJson,
  matchMetasJson,
}: CreateMatchFormProps) => {
  const players = useMemo(() => {
    return playersJson.map((playerJson) => {
      return Player.fromJSON(playerJson);
    });
  }, [playersJson]);

  const playerLabels = useMemo(() => {
    return players.map((player) => {
      return {
        key: player.id,
        label: player.fullNameWithUnivName,
        value: player.fullNameWithUnivName,
      };
    });
  }, [players]);

  const matchMetas = useMemo(() => {
    return matchMetasJson.map((matchMetaJson) => {
      return MatchMeta.fromJSON(matchMetaJson);
    });
  }, [matchMetasJson]);

  const matchMetaLabels = useMemo(() => {
    return matchMetas.map((matchMeta) => {
      return {
        key: matchMeta.id,
        label: matchMeta.type,
        value: matchMeta.type,
      };
    });
  }, [matchMetas]);

  const [lastResult, action] = useFormState(createMatchAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      console.log(parseWithZod(formData, { schema: createMatchSchema }));
      return parseWithZod(formData, { schema: createMatchSchema });
    },
    shouldValidate: "onBlur",
    defaultValue: {
      isDefo: "false",
    },
  });

  const scores = fields.scores.getFieldList();

  const isDefoControl = useInputControl(fields.isDefo);
  const matchMetaControl = useInputControl(fields.matchMetaId);
  const winnerControl = useInputControl(fields.winnerId);
  const loserControl = useInputControl(fields.loserId);

  return (
    <div className="mt-4">
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
          <Label htmlFor={fields.matchMetaId.id} className="mr-4">
            試合種別
          </Label>
          <Combobox
            id={fields.matchMetaId.id}
            label="試合情報"
            dataList={matchMetaLabels}
            control={matchMetaControl}
          />
          <Warn>{fields.matchMetaId.errors}</Warn>
        </div>
        <div>
          <Label htmlFor={fields.winnerId.id} className="mr-4">
            勝者
          </Label>
          <Combobox
            id={fields.winnerId.id}
            label="勝者"
            dataList={playerLabels}
            control={winnerControl}
          />
          <Warn>{fields.winnerId.errors}</Warn>
        </div>
        <div>
          <Label htmlFor={fields.loserId.id} className="mr-4">
            敗者
          </Label>
          <Combobox
            id={fields.loserId.id}
            label="敗者"
            dataList={playerLabels}
            control={loserControl}
          />
          <Warn>{fields.loserId.errors}</Warn>
        </div>
        <div className="flex items-center gap-x-4 py-2">
          <Label htmlFor={fields.isDefo.id}>デフォしたかどうか</Label>
          <Switch
            name={fields.isDefo.name}
            id={fields.isDefo.id}
            value={isDefoControl.value}
            onCheckedChange={(checked) => {
              isDefoControl.change(checked ? "true" : "false");
            }}
          />
        </div>
        {fields.isDefo.value === "false" && (
          <>
            <div className="flex items-center justify-center gap-x-1 pr-8">
              <div>
                <Label htmlFor={fields.gameCount.id}>ゲームカウント</Label>
                <Warn>{""}</Warn>
              </div>
              <CreateScoreForm score={fields.gameCount} />
            </div>
            <CreateGameScoresForm
              scores={scores}
              RemoveButton={({ index }: { index: number }) => {
                return (
                  <Button
                    {...form.remove.getButtonProps({
                      name: fields.scores.name,
                      index,
                    })}
                    variant="destructive"
                  >
                    削除
                  </Button>
                );
              }}
            />
            {scores.length < 5 && (
              <Button
                {...form.insert.getButtonProps({
                  name: fields.scores.name,
                })}
                variant="secondary"
              >
                ゲーム追加
              </Button>
            )}
          </>
        )}
        <div className="flex justify-center py-4">
          <Button variant="default">登録</Button>
        </div>
      </form>
    </div>
  );
};
