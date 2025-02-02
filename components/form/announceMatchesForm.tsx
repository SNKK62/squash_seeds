"use client";
import { useCallback, useMemo, useState } from "react";

import { Warn } from "@/components/form/warn";
import { MatchesTable } from "@/components/table/matchesTable";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loadingButton";
import { calculateTweetLength, generateTweetText } from "@/lib/tweet";

import { Role } from "@model/gakuren.model";
import { Match, MatchJSON } from "@model/match.model";

interface AnnounceMatchesFormProps {
  matchesJson: MatchJSON[];
  isTeam: boolean;
  role: Role;
}

function AnnounceMatchesForm({
  matchesJson,
  role,
  isTeam,
}: AnnounceMatchesFormProps) {
  const [matches, setMatches] = useState(
    matchesJson?.map((matchJson) => Match.fromJSON(matchJson)) ?? []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const tweetText = useMemo(() => {
    const selectedMatches = selectedIds.map((id) => {
      return matches.find((match) => match.id === id)!;
    });
    const matchesNotAnnounced: Match[] = selectedMatches.filter((match) => {
      return !match.isAnnounced;
    });
    if (matchesNotAnnounced.length === 0) {
      return "";
    }
    return generateTweetText(matchesNotAnnounced, isTeam);
  }, [selectedIds, matches, isTeam]);

  const textLength = useMemo(
    () => calculateTweetLength(tweetText),
    [tweetText]
  );

  const handleClickCopy = useCallback(() => {
    navigator.clipboard.writeText(tweetText);
  }, [tweetText]);

  const handleClickTweet = () => {
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

  const [loadingMark, setLoadingMark] = useState(false);
  // 幹部が手動で試合をツイートした後に押すボタン
  const handleClickMark = () => {
    const isConfirmed = window.confirm("ツイート済みにしますか？");
    if (!isConfirmed) {
      return;
    }
    setLoadingMark(true);

    if (selectedIds.length === 0) {
      setError("試合を選択してください");
      setLoadingMark(false);
      return;
    }
    fetch(`${process.env["NEXT_PUBLIC_ORIGIN"]}/api/tournament/matches/mark`, {
      method: "post",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matchIds: selectedIds }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("更新に失敗しました");
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
        setLoadingMark(false);
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
        <LoadingButton
          onClick={handleClickTweet}
          loading={loading}
          className="my-4"
        >
          Tweet
        </LoadingButton>
      </div>
      <div className="text-center">
        <Warn>{error}</Warn>
      </div>
      <div className="m-8 mt-0">
        <div className="flex justify-center">
          <Button onClick={handleClickCopy} className="my-4">
            Copy
          </Button>
        </div>
        {role === "幹部" && (
          <div className="flex justify-center">
            <LoadingButton
              onClick={handleClickMark}
              loading={loadingMark}
              className="my-4"
              variant="destructive"
            >
              手動でTweetした(幹部用)
            </LoadingButton>
          </div>
        )}
        <div className="text-center">Tweet Text</div>
        <div className="text-center">Text Length: {textLength} / 280</div>
        <div
          dangerouslySetInnerHTML={{
            __html: tweetText.replace(/\n/g, "<br>"),
          }}
        />
      </div>
    </div>
  );
}

export default AnnounceMatchesForm;
