import { Checkbox } from "@/components/ui/checkbox";
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
  matches: {
    data: Match;
    checked: boolean;
  }[];
  onCheck: (index: number) => void;
}

export function MatchesTable({ matches, onCheck }: MatchesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>試合結果</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matches.map((match, i) => (
          <TableRow
            className="cursor-pointer"
            key={match.data.id}
            onClick={() => {
              onCheck(i);
            }}
          >
            <TableCell key={`${match.data.id}_check`}>
              <Checkbox checked={match.checked} id={match.data.id} />
            </TableCell>
            <TableCell key={`${match.data.id}_formatted`}>
              {match.data.formattedScore}
            </TableCell>
          </TableRow>
        ))}
        <TableRow />
      </TableBody>
    </Table>
  );
}
