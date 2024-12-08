import type {Document, HTMLElement} from './domStreamTypes';

export function addPuzzle(document: Document, parent: HTMLElement) {
  const puzzle = document.createElement('section');
  parent.append(puzzle);
  puzzle.setAttribute('class', 'puzzle');

  for (let row = 0; row !== 5; row++) {
    const rowElement = document.createElement('section');
    puzzle.append(rowElement);
    rowElement.setAttribute('class', 'row');
    for (let column = 0; column !== 5; column++) {
      const cell = document.createElement('section');
      rowElement.append(cell);
      cell.setAttribute('class', 'cell');
      const testColors = ['red', 'green', 'blue'];
      const use = (row + column) % testColors.length;
      cell.setAttribute('style', `background:${testColors[use]}`);
    }
  }
}
