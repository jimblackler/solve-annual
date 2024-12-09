import deepcopy from 'deepcopy';
import {baseSpec} from './baseSpec';
import {assertDefined as defined} from './check/defined';
import type {Document, HTMLElement} from './domStreamTypes';
import {render} from './render';
import {solve} from './solve';

function* getSolutions(month: number, day: number) {
  const rows = deepcopy(baseSpec.rows);
  const monthRow = Math.floor((month - 1) / 6);
  const monthColumn = (month - 1) % 6;
  defined(rows[monthRow])[monthColumn] = -2;

  const dayRow = Math.floor((day - 1) / 7) + 2;
  const dayColumn = (day - 1) % 7;
  defined(rows[dayRow])[dayColumn] = -2;

  yield* solve(rows, baseSpec.pieces);
}

export function renderDay(document: Document, parent: HTMLElement, month: number, day: number) {
  const allSolutions = document.createElement('section');
  parent.append(allSolutions);
  allSolutions.setAttribute('class', 'allSolutions');
  for (const solution of getSolutions(month, day)) {
    render(document, allSolutions, baseSpec.pieces, solution);
  }
}
