import type {PuzzleSpec} from './addPuzzle';
import {assertDefined as defined} from './check/defined';

export function solve(spec: PuzzleSpec, useRows: number[][]) {
  function place(pieceNumber: number) {
    const piece = defined(spec.pieces[pieceNumber - 1]);
    for (let rowNumber = 0; rowNumber !== piece.rows.length; rowNumber++) {
      const row = defined(piece.rows[rowNumber]);
      for (let cellNumber = 0; cellNumber !== row.length; cellNumber++) {
        const writeRow = defined(useRows[rowNumber]);
        writeRow[cellNumber] = pieceNumber;
      }
    }
  }

  place(1);

}
