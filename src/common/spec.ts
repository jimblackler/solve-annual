export type PieceSpec = {
  color: string;
  rows: number[][];
};

export type PuzzleSpec = {
  rows: number[][];
  pieces: PieceSpec[];
};
