import type {NextFunction, Request, Response} from 'express';
import {addPuzzle} from '../../common/addPuzzle';
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

  addPuzzle(document, body);

  addScripts(document, body, 'main');

  domStream.end();
}
