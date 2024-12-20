import {assertDefined as defined} from '../common/check/defined';
import type {Document, HTMLElement} from '../common/domStreamTypes';

export function render(document: Document, parent: HTMLElement, showRows: number[][]) {
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
      const cellValue = defined(row[column]);
      cell.setAttribute('class', `cell cell${cellValue.toString().replace('-', 'm')}`);
    }
  }
}
