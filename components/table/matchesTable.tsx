import Link from "next/link";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { LoadingButton } from "@/components/ui/loadingButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Match } from "@model/match.model";

interface MatchesTableProps {
  matches: Match[];
  selectedIds: string[];
  selectId: (id: string) => void;
  unselectId: (id: string) => void;
  removeMatch: (id: string) => void;
}

export function MatchesTable({
  matches,
  selectedIds,
  selectId,
  unselectId,
  removeMatch,
}: MatchesTableProps) {
  const [loadings, setLoadings] = useState<string[]>([]);
  const handleDelete = (id: string) => {
    setLoadings((prev) => [...prev, id]);
    fetch(`${process.env["NEXT_PUBLIC_ORIGIN"]}/api/matches/${id}`, {
      method: "delete",
      cache: "no-store",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("削除に失敗しました");
        }
        return res.json();
      })
      .then(() => {
        unselectId(id);
        removeMatch(id);
      })
      .catch(() => {})
      .finally(() => {
        setLoadings((prev) => prev.filter((loadingId) => loadingId !== id));
      });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{""}</TableHead>
          <TableHead>試合結果</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matches.map((match) => (
          <TableRow
            className="cursor-pointer overflow-x-scroll whitespace-pre"
            key={match.id}
            onClick={() => {
              if (selectedIds.includes(match.id)) {
                unselectId(match.id);
              } else {
                selectId(match.id);
              }
            }}
          >
            <TableCell className="w-4">
              <Checkbox
                checked={selectedIds.includes(match.id)}
                id={match.id}
              />
            </TableCell>
            <TableCell>{`[${match.matchMeta.type}] ${match.formattedScore}`}</TableCell>
            <TableCell>
              <Link
                href={`/tournament/matches/edit/${match.id}`}
                className="text-blue-500 underline"
                onClick={(e) => e.stopPropagation()}
              >
                編集
              </Link>
            </TableCell>
            <TableCell>
              <LoadingButton
                variant="destructive"
                loading={loadings.includes(match.id)}
                onClick={async (e) => {
                  e.stopPropagation();
                  handleDelete(match.id);
                }}
                labelInLoading="削除中です"
              >
                削除
              </LoadingButton>
            </TableCell>
          </TableRow>
        ))}
        <TableRow />
      </TableBody>
    </Table>
  );
}
