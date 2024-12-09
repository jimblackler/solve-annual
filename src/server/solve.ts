import deepEqual from 'deep-equal';
import deepcopy from 'deepcopy';
import {assertDefined as defined} from '../common/check/defined';

function getCellOffset(pieceRows: number[][]) {
  const firstRow = defined(pieceRows[0]);
  return firstRow.findIndex(value => value !== 0);
}

function firstEmpty(rows: number[][]): [number, number] | undefined {
  for (let rowNumber = 0; rowNumber < rows.length; rowNumber++) {
    const row = defined(rows[rowNumber]);
    for (let columnNumber = 0; columnNumber < rows.length; columnNumber++) {
      if (row[columnNumber] === 0) {
        return [columnNumber, rowNumber];
      }
    }
  }
  return undefined;
}

function* yieldPositions(rows: number[][], pieceRows: number[][]): Generator<[number, number]> {
  const firstEmpty1 = defined(firstEmpty(rows));
  const columnNumber = firstEmpty1[0] - getCellOffset(pieceRows);
  const rowNumber = firstEmpty1[1];
  for (let rowNumber1 = 0; rowNumber1 !== pieceRows.length; rowNumber1++) {
    const row = defined(pieceRows[rowNumber1]);
    for (let columnNumber1 = 0; columnNumber1 !== row.length; columnNumber1++) {
      if (defined(pieceRows[rowNumber1])[columnNumber1] === 1) {
        yield [columnNumber + columnNumber1, rowNumber + rowNumber1];
      }
    }
  }
}

function fits(rows: number[][], pieceRows: number[][]) {
  for (const position of yieldPositions(rows, pieceRows)) {
    const [columnNumber, rowNumber] = position;
    const row = rows[rowNumber];
    if (row === undefined) {
      return false;
    }
    const cell = row[columnNumber];
    if (cell === undefined) {
      return false;
    }
    if (cell !== 0) {
      return false;
    }
  }
  return true;
}

function place(rows: number[][], pieceRows: number[][], pieceNumber: number) {
  for (const position of yieldPositions(rows, pieceRows)) {
    const [columnNumber, rowNumber] = position;
    const row = defined(rows[rowNumber]);
    row[columnNumber] = pieceNumber;
  }
  return true;
}

function* variations2(pieceRows: number[][]) {
  yield pieceRows;

  const rows: number[][] = [];
  for (let rowNumber1 = 0; rowNumber1 !== pieceRows.length; rowNumber1++) {
    const row = defined(pieceRows[rowNumber1]);
    for (let columnNumber1 = 0; columnNumber1 !== row.length; columnNumber1++) {
      while (rows.length <= columnNumber1) {
        rows.push([]);
      }
      const numbers = defined(rows[columnNumber1]);
      while (numbers.length < rowNumber1) {
        numbers.push(0);
      }
      numbers[rowNumber1] = defined(row[columnNumber1]);
    }
  }
  yield rows;
}

function* variations1(pieceRows: number[][]) {
  yield* variations2(pieceRows);
  yield* variations2(pieceRows.toReversed());
}

function* variations(pieceRows: number[][]) {
  yield* variations1(pieceRows);
  yield* variations1(pieceRows.map(row => row.toReversed()));
}

function getAllVariations(pieceRows: number[][]) {
  const allVariations: number[][][] = [];
  for (const piece of variations(pieceRows)) {
    if (allVariations.every(variation => !deepEqual(variation, piece))) {
      allVariations.push(piece);
    }
  }
  return allVariations;
}

function* solveFrom(
    allAllVariations: number[][][][], remain: number[], rows: number[][]): Generator<number[][]> {
  if (remain.length === 0) {
    yield rows;
  }
  for (let remainNumber = 0; remainNumber !== remain.length; remainNumber++) {
    const pieceNumber = defined(remain[remainNumber]);
    for (const variation of defined(allAllVariations[pieceNumber - 1])) {
      if (fits(rows, variation)) {
        const newRows = deepcopy(rows);
        place(newRows, variation, pieceNumber);
        yield* solveFrom(allAllVariations, remain.filter(other => other !== pieceNumber), newRows);
      }
    }
  }
}

export function* solve(rows: number[][], specPieces: number[][][]): Generator<number[][]> {
  const allAllVariations =
      specPieces.map((_, index) => getAllVariations(defined(specPieces[index])));

  yield* solveFrom(allAllVariations, specPieces.map((_, index) => index + 1), rows);
}
