import {assertDefined as defined} from './check/defined';
import type {Document, HTMLElement} from './domStreamTypes';
import {type PuzzleSpec, render} from './render';
import {solve} from './solve';

export function renderDay(document: Document, parent: HTMLElement, month: number, day: number) {
  const spec: PuzzleSpec = {
    rows: [
      [0, 0, 0, 0, 0, 0, -1],
      [0, 0, 0, 0, 0, 0, -1],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, -1, -1, -1, -1]
    ],
    pieces: [
      {
        color: 'yellow',
        rows: [[1, 1, 1], [1, 1, 1]]
      }, {
        color: 'orange',
        rows: [[1, 1, 1], [1, 1, 0]]
      }, {
        color: 'red',
        rows: [[1, 1, 1, 1], [1, 0, 0, 0]]
      }, {
        color: 'cyan',
        rows: [[1, 1, 1, 1], [0, 1, 0, 0]]
      }, {
        color: 'lightgreen',
        rows: [[1, 0, 0], [1, 1, 1], [0, 0, 1]]
      }, {
        color: 'darkgreen',
        rows: [[1, 1, 1], [1, 0, 0], [1, 0, 0]]
      }, {
        color: 'blue',
        rows: [[1, 1, 1, 0], [0, 0, 1, 1]]
      }, {
        color: 'purple',
        rows: [[1, 1, 1], [1, 0, 1]]
      }
    ]
  };

  const monthRow = Math.floor((month - 1) / 6);
  const monthColumn = (month - 1) % 6;
  defined(spec.rows[monthRow])[monthColumn] = -2;

  const dayRow = Math.floor((day - 1) / 7) + 2;
  const dayColumn = (day - 1) % 7;
  defined(spec.rows[dayRow])[dayColumn] = -2;

  const allSolutions = document.createElement('section');
  parent.append(allSolutions);
  allSolutions.setAttribute('class', 'allSolutions');

  for (const solution of solve(spec)) {
    render(document, allSolutions, spec, solution);
  }
}
