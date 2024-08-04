"use client";
import { FieldMetadata, useForm, useInputControl } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFormState } from "react-dom";
import { z } from "zod";

import { Warn } from "@/components/form/warn";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loadingButton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

import { updateMatchAction } from "@actions/matches/updateMatch.action";
import {
  updateMatchSchema,
  scoreSchema,
} from "@actions/schema/updateMatch.schema";
import { Match, MatchJSON, Score } from "@model/match.model";
import { MatchMeta, MatchMetaJSON } from "@model/matchMeta.model";
import { Player, PlayerJSON } from "@model/player.model";
import { Sex } from "@model/sex";

type LoadingContextType = React.Dispatch<React.SetStateAction<boolean>>;
const loadingContext = createContext<LoadingContextType>(() => {});

type EditScoreFormProps = {
  score: FieldMetadata<z.infer<typeof scoreSchema>>;
  defaultValue?: Score | undefined;
};

const EditScoreForm = ({ score, defaultValue }: EditScoreFormProps) => {
  const scoreFields = score.getFieldset();
  const setLoading = useContext(loadingContext);

  const [winnerVal, setWinnerVal] = useState<string | number>(
    defaultValue?.winnerScore ?? ""
  );
  const [loserVal, setLoserVal] = useState<string | number>(
    defaultValue?.loserScore ?? ""
  );

  useEffect(() => {
    if (scoreFields.winnerScore.errors || scoreFields.loserScore.errors) {
      setLoading(false);
    }
  }, [
    scoreFields.winnerScore.errors,
    scoreFields.loserScore.errors,
    setLoading,
  ]);

  return (
    <div className="flex items-center gap-1">
      <div className="aspect-square w-16">
        <Input
          id={scoreFields.winnerScore.id}
          type="number"
          name={scoreFields.winnerScore.name}
          value={winnerVal}
          onChange={(e) => {
            setWinnerVal(e.target.value ? parseInt(e.target.value) : "");
          }}
        />
        <Warn> {scoreFields.winnerScore.errors}</Warn>
      </div>
      <div className="pb-8 text-5xl font-medium">-</div>
      <div className="aspect-square w-16">
        <Input
          id={scoreFields.loserScore.id}
          type="number"
          name={scoreFields.loserScore.name}
          value={loserVal}
          onChange={(e) => {
            setLoserVal(e.target.value ? parseInt(e.target.value) : "");
          }}
        />
        <Warn> {scoreFields.loserScore.errors}</Warn>
      </div>
    </div>
  );
};

type EditGameScoresFormProps = {
  scores: FieldMetadata<z.infer<typeof scoreSchema>>[];
  defaultValue?: Score[];
  RemoveButton: (index: { index: number }) => React.JSX.Element;
};

const EditGameScoresForm = ({
  scores,
  defaultValue,
  RemoveButton,
}: EditGameScoresFormProps) => {
  return (
    <ul>
      {scores.map((score, i) => {
        return (
          <div key={i} className="flex items-center justify-start gap-x-2">
            <div>
              <Label htmlFor={score.id}>{i + 1}セット目</Label>
              <Warn>{""}</Warn>
            </div>

            <EditScoreForm score={score} defaultValue={defaultValue?.[i]} />
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

interface EditMatchFormProps {
  playersJson: PlayerJSON[];
  matchMetasJson: MatchMetaJSON[];
  matchJson: MatchJSON;
}

export const EditMatchForm = ({
  playersJson,
  matchMetasJson,
  matchJson,
}: EditMatchFormProps) => {
  const match = useMemo(() => Match.fromJSON(matchJson), [matchJson]);
  const [sexOption, setSexOption] = useState<Sex>(match.matchMeta.sex);
  const [isDefo, setIsDefo] = useState<"false" | "true">(
    match.isDefo ? "true" : "false"
  );

  const players = useMemo(() => {
    return playersJson.map((playerJson) => {
      return Player.fromJSON(playerJson);
    });
  }, [playersJson]);

  const playerLabels = useMemo(() => {
    const playersWithSelectedSex = players.filter((player) => {
      return player.sex == sexOption;
    });
    return playersWithSelectedSex.map((player) => {
      return {
        key: player.id,
        label: player.fullNameWithUnivName,
        value: player.id,
      };
    });
  }, [players, sexOption]);

  const matchMetas = useMemo(() => {
    return matchMetasJson.map((matchMetaJson) => {
      return MatchMeta.fromJSON(matchMetaJson);
    });
  }, [matchMetasJson]);

  const matchMetaLabels = useMemo(() => {
    const matchMetasOfSelectedSex = matchMetas.filter((matchMeta) => {
      return matchMeta.sex == sexOption;
    });
    return matchMetasOfSelectedSex.map((matchMeta) => {
      return {
        key: matchMeta.id,
        label: matchMeta.type,
        value: matchMeta.id,
      };
    });
  }, [matchMetas, sexOption]);

  const [lastResult, action] = useFormState(updateMatchAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updateMatchSchema });
    },
    shouldValidate: "onSubmit",
    defaultValue: match.isDefo
      ? {
          matchMetaId: match.matchMeta.id,
          winnerId: match.winner.id,
          loserId: match.loser.id,
        }
      : {
          matchMetaId: match.matchMeta.id,
          winnerId: match.winner.id,
          loserId: match.loser.id,
          gameCount: {
            winnerScore: match.gameCount.winnerScore,
            loserScore: match.gameCount.loserScore,
          },
          scores: match.gameScores.map((score) => {
            return {
              winnerScore: score.winnerScore,
              loserScore: score.loserScore,
            };
          }),
        },
  });

  const [loading, setLoading] = useState(false);

  const SUBMIT_BUTTON_LABEL = "確定";

  useEffect(() => {
    if (
      form.errors ||
      fields.matchMetaId.errors ||
      fields.winnerId.errors ||
      fields.loserId.errors ||
      fields.isDefo.errors
    ) {
      setLoading(false);
    }
  }, [
    form.errors,
    fields.matchMetaId.errors,
    fields.winnerId.errors,
    fields.loserId.errors,
    fields.isDefo.errors,
  ]);

  const scores = fields.scores.getFieldList();

  const matchMetaControl = useInputControl(fields.matchMetaId);
  const winnerControl = useInputControl(fields.winnerId);
  const loserControl = useInputControl(fields.loserId);

  return (
    <loadingContext.Provider value={setLoading}>
      <div className="mt-4">
        <div className="pt-4 text-center text-3xl font-bold">試合結果編集</div>
        <form
          className="m-auto p-4 px-2"
          id={form.id}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSubmit={(e: any) => {
            if (e.nativeEvent.submitter.innerText === SUBMIT_BUTTON_LABEL) {
              setLoading(true);
            }
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
          <RadioGroup
            value={sexOption}
            className="my-2 flex justify-center gap-x-4"
          >
            <div>
              <RadioGroupItem
                value="男子"
                id="male"
                onClick={() => {
                  setSexOption("男子");
                }}
              />
              <Label htmlFor="male">男子</Label>
            </div>
            <div>
              <RadioGroupItem
                value="女子"
                id="female"
                onClick={() => {
                  setSexOption("女子");
                }}
              />
              <Label htmlFor="female">女子</Label>
            </div>
          </RadioGroup>
          <input
            name={fields.id.name}
            id={fields.id.id}
            hidden
            value={match.id}
            onChange={() => {}}
          />
          <div className="m-auto flex max-w-xs flex-col items-start gap-y-1">
            <div>
              <Label htmlFor={fields.matchMetaId.id} className="mr-4">
                試合種別：
              </Label>
              <Combobox
                id={fields.matchMetaId.id}
                label="試合情報"
                dataList={matchMetaLabels}
                defaultValue={match.matchMeta.id}
                control={matchMetaControl}
              />
              <Warn className="ml-24">{fields.matchMetaId.errors}</Warn>
            </div>
            <div>
              <Label htmlFor={fields.winnerId.id} className="mr-4">
                勝者：
              </Label>
              <Combobox
                id={fields.winnerId.id}
                label="勝者"
                dataList={playerLabels}
                defaultValue={match.winner.id}
                control={winnerControl}
              />
              <Warn className="ml-16">{fields.winnerId.errors}</Warn>
            </div>
            <div>
              <Label htmlFor={fields.loserId.id} className="mr-4">
                敗者：
              </Label>
              <Combobox
                id={fields.loserId.id}
                label="敗者"
                dataList={playerLabels}
                defaultValue={match.loser.id}
                control={loserControl}
              />
              <Warn className="ml-16">{fields.loserId.errors}</Warn>
            </div>

            <div className="flex items-center gap-x-4 py-2">
              <Label htmlFor={fields.isDefo.id}>デフォしたかどうか</Label>
              <input
                hidden
                name={fields.isDefo.name}
                id={fields.isDefo.id}
                value={isDefo}
                onChange={() => {}}
              />
              <Switch
                checked={isDefo === "true"}
                onCheckedChange={(checked) => {
                  setIsDefo(checked ? "true" : "false");
                }}
              />
            </div>
            <div className="flex items-center py-2">
              <Warn>{fields.isDefo.errors}</Warn>
            </div>
            {/* this condition adapts for the first render */}
            {fields.isDefo.value !== "true" && (
              <>
                <div className="flex items-center justify-start gap-x-1 pr-8">
                  <div>
                    <Label htmlFor={fields.gameCount.id}>ゲームカウント</Label>
                    <Warn>{""}</Warn>
                  </div>
                  <EditScoreForm
                    score={fields.gameCount}
                    defaultValue={match.gameCount}
                  />
                </div>
                <EditGameScoresForm
                  scores={scores}
                  defaultValue={match.gameScores}
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
          </div>
          <div className="flex justify-center py-4">
            <LoadingButton loading={loading} variant="default">
              {SUBMIT_BUTTON_LABEL}
            </LoadingButton>
          </div>
        </form>
      </div>
    </loadingContext.Provider>
  );
};
