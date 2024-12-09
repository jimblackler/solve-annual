import type {PuzzleSpec} from './spec';

export const baseSpec: PuzzleSpec = {
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
