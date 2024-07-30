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
  onCheck: (matchId: string) => void;
  selectedIds: string[];
  onDelete: (id: string) => void;
}

export function MatchesTable({
  matches,
  onCheck,
  selectedIds,
  onDelete,
}: MatchesTableProps) {
  const handleDelete = async (id: string) => {
    await fetch(`${process.env["NEXT_PUBLIC_ORIGIN"]}/api/matches/${id}`, {
      method: "delete",
      cache: "no-store",
    });
    onDelete(id);
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
              onCheck(match.id);
            }}
          >
            <TableCell className="w-4">
              <Checkbox
                checked={selectedIds.includes(match.id)}
                id={match.id}
              />
            </TableCell>
            <TableCell>{match.formattedScore}</TableCell>
            <TableCell>
              <LoadingButton
                variant="destructive"
                onClick={async (e) => {
                  e.stopPropagation();
                  await handleDelete(match.id);
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
