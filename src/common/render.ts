import {assertDefined as defined} from './check/defined';
import type {Document, HTMLElement} from './domStreamTypes';

export type PuzzleSpec = {
  rows: number[][];
  pieces: PieceSpec[];
};
export type PieceSpec = {
  color: string;
  rows: number[][];
};

export function render(
    document: Document, parent: HTMLElement, spec: PuzzleSpec, showRows: number[][]) {
  const puzzle = document.createElement('section');
  parent.append(puzzle);
  puzzle.setAttribute('class', 'puzzle');

  for (let rowNumber = 0; rowNumber !== spec.rows.length; rowNumber++) {
    const row = defined(showRows[rowNumber]);
    const rowElement = document.createElement('section');
    puzzle.append(rowElement);
    rowElement.setAttribute('class', 'row');
    for (let column = 0; column !== row.length; column++) {
      const cell = document.createElement('section');
      rowElement.append(cell);
      cell.setAttribute('class', 'cell');

      const cellValue = defined(row[column]);
      if (cellValue === -2) {
        cell.setAttribute('style', 'background:pink');
      } else if (cellValue === -1) {
        cell.setAttribute('style', 'background:black');
      } else if (cellValue > 0) {
        const pieceSpec = defined(spec.pieces[cellValue - 1]);
        cell.setAttribute('style', `background:${pieceSpec.color}`);
      }
    }
  }
}
