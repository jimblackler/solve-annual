import {Storage} from '@google-cloud/storage';
import deepcopy from 'deepcopy';
import {basePieces, baseRows} from '../common/baseSpec';
import {assertDefined as defined} from '../common/check/defined';
import type {Document, HTMLElement} from '../common/domStreamTypes';
import {render} from '../common/render';
import {solve} from '../common/solve';

function* getSolutions(month: number, day: number) {
  const rows = deepcopy(baseRows);
  const monthRow = Math.floor((month - 1) / 6);
  const monthColumn = (month - 1) % 6;
  defined(rows[monthRow])[monthColumn] = -2;

  const dayRow = Math.floor((day - 1) / 7) + 2;
  const dayColumn = (day - 1) % 7;
  defined(rows[dayRow])[dayColumn] = -2;

  yield* solve(rows, basePieces);
}

async function getSolutionsCached(month: number, day: number) {
  const spec = new URLSearchParams();
  spec.set('m', month.toString());
  spec.set('d', day.toString());
  const str = spec.toString();

  const storage = new Storage();
  const bucket = defined((await storage.getBuckets())[0][0]);
  const file = bucket.file(str);
  const booleans = await file.exists();
  if (booleans[0]) {
    const r2 = await file.download();
    return JSON.parse(r2[0].toString()) as number[][][];
  }
  const results = [...getSolutions(month, day)];
  await file.save(JSON.stringify(results));
  return results;
}

export async function renderDay(
    document: Document, parent: HTMLElement, month: number, day: number) {
  const date = new Date(2024, month - 1, day, 0, 0, 0, 0);
  const solutions = await getSolutionsCached(month, day);
  const h1 = document.createElement('h1');
  parent.append(h1);
  h1.append(`${date.toLocaleDateString('default', {
    month: 'long',
    day: 'numeric'
  })} : ${solutions.length} solutions`);

  const linkSection = document.createElement('h3');
  parent.append(linkSection);
  linkSection.setAttribute('class', 'linkSection');

  const previousDay = new Date(date);
  previousDay.setDate(previousDay.getDate() - 1);
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);

  const previousLink = document.createElement('a');
  linkSection.append(previousLink);
  previousLink.setAttribute('href', `/day/${previousDay.getMonth() + 1}/${previousDay.getDate()}`);
  previousLink.append('<< Previous Day');

  const nextLink = document.createElement('a');
  linkSection.append(nextLink);
  nextLink.setAttribute('href', `/day/${nextDay.getMonth() + 1}/${nextDay.getDate()}`);
  nextLink.append('Next Day >>');

  const allSolutions = document.createElement('section');
  parent.append(allSolutions);
  allSolutions.setAttribute('class', 'allSolutions');
  for (const solution of solutions) {
    render(document, allSolutions, solution);
  }
}
