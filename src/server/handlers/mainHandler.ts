import deepcopy from 'deepcopy';
import type {NextFunction, Request, Response} from 'express';
import {addPuzzle, type PuzzleSpec} from '../../common/addPuzzle';
import {DomStream} from '../domStream';
import {addScripts} from '../manifest';

export function mainHandler(req: Request, res: Response, next: NextFunction) {
  const domStream = new DomStream(res);
  const {document} = domStream;

  document.documentElement.setAttribute('lang', 'en');

  const {head} = document;
  const metaCharset = document.createElement('meta');
  head.append(metaCharset);
  metaCharset.setAttribute('charset', 'utf-8');

  const metaViewport = document.createElement('meta');
  head.append(metaViewport);
  metaViewport.setAttribute('name', 'viewport');
  metaViewport.setAttribute('content', 'width=device-width, initial-scale=1');

  const titleElement = document.createElement('title');
  head.append(titleElement);
  titleElement.append('Solve Annual by Jim Blackler');

  const style = document.createElement('link');
  head.append(style);
  style.setAttribute('rel', 'stylesheet');
  style.setAttribute('href', '/styles/base.css');

  const faviconLink = document.createElement('link');
  head.append(faviconLink);
  faviconLink.setAttribute('rel', 'shortcut icon');
  faviconLink.setAttribute('href', 'favicon.png');

  const {body} = document;

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
    pieces: [{
      color: 'yellow',
      rows: [[1, 1, 1], [1, 1, 1]]
    }, {
      color: 'orange',
      rows: [[1, 1, 1], [1, 1]]
    }, {
      color: 'red',
      rows: [[1, 1, 1, 1], [1]]
    }, {
      color: 'cyan',
      rows: [[1, 1, 1, 1], [0, 1]]
    }, {
      color: 'green',
      rows: [[1], [1, 1, 1], [0, 0, 1]]
    }, {
      color: 'dark green',
      rows: [[1, 1, 1], [1], [1]]
    }, {
      color: 'blue',
      rows: [[1, 1, 1], [0, 0, 1, 1]]
    }, {
      color: 'purple',
      rows: [[1, 1, 1], [1, 0, 1]]
    }
    ]
  };

  const showRows = deepcopy(spec.rows);
  addPuzzle(document, body, spec, showRows);

  addScripts(document, body, 'main');

  domStream.end();
}
