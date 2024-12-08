import deepcopy from 'deepcopy';
import type {PieceSpec, PuzzleSpec} from './addPuzzle';
import {assertDefined as defined} from './check/defined';

function getCellOffset(piece: PieceSpec) {
  const firstRow = defined(piece.rows[0]);
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

function* yieldPositions(rows: number[][], piece: PieceSpec): Generator<[number, number]> {
  const firstEmpty1 = firstEmpty(rows);
  if (firstEmpty1 === undefined) {
    return;
  }
  const columnNumber = firstEmpty1[0] - getCellOffset(piece);
  const rowNumber = firstEmpty1[1];
  for (let rowNumber1 = 0; rowNumber1 !== piece.rows.length; rowNumber1++) {
    const row = defined(piece.rows[rowNumber1]);
    for (let columnNumber1 = 0; columnNumber1 !== row.length; columnNumber1++) {
      yield [columnNumber + columnNumber1, rowNumber + rowNumber1];
    }
  }
}

function fits(rows: number[][], piece: PieceSpec) {
  for (const position of yieldPositions(rows, piece)) {
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

function place(rows: number[][], piece: PieceSpec, pieceNumber: number) {
  for (const position of yieldPositions(rows, piece)) {
    const [columnNumber, rowNumber] = position;
    const row = defined(rows[rowNumber]);
    row[columnNumber] = pieceNumber;
  }
  return true;
}

function* solveFrom(pieces: PieceSpec[], remain: number[],
                    rows: number[][]): Generator<number[][]> {
  if (remain.length === 0) {
    yield rows;
  }
  for (let remainNumber = 0; remainNumber !== remain.length; remainNumber++) {
    const pieceNumber = defined(remain[remainNumber]);
    const piece = defined(pieces[pieceNumber - 1]);
    if (fits(rows, piece)) {
      const newRows = deepcopy(rows);
      place(newRows, piece, pieceNumber);
      yield* solveFrom(
          pieces, remain.filter(other => other !== pieceNumber), newRows);
    }
  }
}

export function* solve(spec: PuzzleSpec): Generator<number[][]> {
  yield* solveFrom(spec.pieces, spec.pieces.map((_, index) => index + 1), spec.rows);
}
