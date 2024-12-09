import type {Document, HTMLElement} from './domStreamTypes';
import {type PuzzleSpec, render} from './render';
import {solve} from './solve';

export function renderDay(document: Document, parent: HTMLElement) {
  const spec: PuzzleSpec = {
    rows: [
      [0, 0, 0, 0, 0, 0, -1],
      [0, 0, 0, 0, 0, -2, -1],
      [0, 0, 0, 0, 0, 0, 0],
      [-2, 0, 0, 0, 0, 0, 0],
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

  const allSolutions = document.createElement('section');
  parent.append(allSolutions);
  allSolutions.setAttribute('class', 'allSolutions');

  for (const showRows of solve(spec)) {
    render(document, allSolutions, spec, showRows);
  }
}
