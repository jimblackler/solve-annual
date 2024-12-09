import {assertDefined as defined} from './check/defined';
import type {Document, HTMLElement} from './domStreamTypes';
import type {PieceSpec} from './spec';

export function render(
    document: Document, parent: HTMLElement, specPieces: PieceSpec[], showRows: number[][]) {
  const puzzle = document.createElement('section');
  parent.append(puzzle);
  puzzle.setAttribute('class', 'puzzle');

  for (let rowNumber = 0; rowNumber !== showRows.length; rowNumber++) {
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
        cell.setAttribute('style', 'background:darkgray');
      } else if (cellValue === -1) {
        cell.setAttribute('style', 'background:black');
      } else if (cellValue === 0) {
        cell.setAttribute('style', 'background:white');
      } else if (cellValue > 0) {
        const pieceSpec = defined(specPieces[cellValue - 1]);
        cell.setAttribute('style', `background:${pieceSpec.color}`);
      }
    }
  }
}
