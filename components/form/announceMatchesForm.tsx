"use client";
import { useCallback, useMemo, useState } from "react";

import { Warn } from "@/components/form/warn";
import { MatchesTable } from "@/components/table/matchesTable";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loadingButton";

import { Match, MatchJSON } from "@model/match.model";

interface AnnounceMatchesFormProps {
  matchesJson: MatchJSON[];
}

function calculateTweetLength(text: string): number {
  let length = 0;
  for (const char of text) {
    if (char === "\n") {
      // 改行文字
      length += 2;
    } else if (char.match(/[ -~]/)) {
      // 半角文字
      length += 1;
    } else {
      // 全角文字
      length += 2;
    }
  }
  return length;
}

function AnnounceMatchesForm({ matchesJson }: AnnounceMatchesFormProps) {
  const [matches, setMatches] = useState(
    matchesJson?.map((matchJson) => Match.fromJSON(matchJson)) ?? []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const tweetText = useMemo(() => {
    const selectedMatches = selectedIds.map((id) => {
      return matches.find((match) => match.id === id)!;
    });
    const matchesNotAnnounced: Match[] = selectedMatches.filter((match) => {
      return !match.isAnnounced;
    });
    // const tournamentName = matchesNotAnnounced[0]?.tournament.name;
    const resultDividedByMatchMeta: Record<string, string[]> = {};
    matchesNotAnnounced.forEach((match) => {
      const matchMetaType = match.matchMeta.type;
      if (!resultDividedByMatchMeta[matchMetaType]) {
        resultDividedByMatchMeta[matchMetaType] = [];
      }
      resultDividedByMatchMeta[matchMetaType].push(match.formattedScore);
    });
    // save the tweet text length
    // let tweetText: string = tournamentName ? `【${tournamentName}】\n` : "";
    let tweetText: string = "";
    tweetText += Object.entries(resultDividedByMatchMeta)
      .map(([key, value]) => {
        let text = `${key}`;
        value.map((el) => {
          text += `\n${el}`;
        });
        text += `\n`;
        return text;
      })
      .join("\n");
    return tweetText;
  }, [selectedIds, matches]);

  const textLength = useMemo(
    () => calculateTweetLength(tweetText),
    [tweetText]
  );

  const handleClickShowResult = useCallback(() => {
    setShowResult((prev) => !prev);
  }, []);

  const handleClickCopy = useCallback(() => {
    navigator.clipboard.writeText(tweetText);
  }, [tweetText]);

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
    <div className="box-border w-full">
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
      <div className="flex justify-center">
        <Button onClick={handleClickShowResult} className="my-4">
          {showResult ? "Hide" : "Show"} Result
        </Button>
      </div>
      {showResult && (
        <div className="m-8 mt-0">
          <div className="flex justify-center">
            <Button onClick={handleClickCopy} className="my-4">
              Copy
            </Button>
          </div>
          <div className="text-center">Tweet Text</div>
          <div className="text-center">Text Length: {textLength} / 280</div>
          <div
            dangerouslySetInnerHTML={{
              __html: tweetText.replace(/\n/g, "<br>"),
            }}
          />
        </div>
      )}
    </div>
  );
}

export default AnnounceMatchesForm;
