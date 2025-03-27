import { getHighScores, clearHighScores } from "@/utils/highScore";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";

export function HighScores() {
  const scores = getHighScores();

  if (scores.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No high scores yet. Start typing to set your first record!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">High Scores</h2>
        <Button
          variant="destructive"
          size="sm"
          onClick={clearHighScores}
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Clear Scores
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>WPM</TableHead>
            <TableHead>Accuracy</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scores.map((score, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">#{index + 1}</TableCell>
              <TableCell>{score.wpm.toFixed(1)}</TableCell>
              <TableCell>{score.accuracy.toFixed(1)}%</TableCell>
              <TableCell>{score.time}s</TableCell>
              <TableCell>{score.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 