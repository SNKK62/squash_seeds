"use client";
import { useState } from "react";

import { Warn } from "@/components/form/warn";
import { MatchesTable } from "@/components/table/matchesTable";
import { LoadingButton } from "@/components/ui/loadingButton";

import { Match, MatchJSON } from "@model/match.model";

interface AnnounceMatchesFormProps {
  matchesJson: MatchJSON[];
}

function AnnounceMatchesForm({ matchesJson }: AnnounceMatchesFormProps) {
  const [matches, setMatches] = useState(
    matchesJson?.map((matchJson) => Match.fromJSON(matchJson)) ?? []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleClick = () => {
    setLoading(true);

    if (selectedIds.length === 0) {
      setError("試合を選択してください");
      setLoading(false);
      return;
    }
    fetch(`${process.env["NEXT_PUBLIC_ORIGIN"]}/api/tournament/matches/tweet`, {
      method: "post",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matchIds: selectedIds }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("ツイートに失敗しました");
        }
        return res.json();
      })
      .then(() => {
        setMatches((prev) => {
          return prev.filter((match) => !selectedIds.includes(match.id));
        });
        setError("");
        setSelectedIds([]);
      })
      .catch((e) => {
        setError(String(e));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-dvw">
      <div className="mx-2">
        <MatchesTable
          matches={matches}
          selectedIds={selectedIds}
          selectId={(id: string) => {
            setSelectedIds([...selectedIds, id]);
          }}
          unselectId={(id: string) => {
            setSelectedIds((prev) => {
              return prev.filter((selectedId) => selectedId !== id);
            });
          }}
          removeMatch={(id: string) => {
            setMatches((prev) => {
              return prev.filter((match) => match.id !== id);
            });
          }}
        />
      </div>
      <div className="flex justify-center">
        <LoadingButton onClick={handleClick} loading={loading} className="my-4">
          Tweet
        </LoadingButton>
      </div>
      <div className="text-center">
        <Warn>{error}</Warn>
      </div>
    </div>
  );
}

export default AnnounceMatchesForm;
