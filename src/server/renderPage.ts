import type {Response} from 'express';
import type {Document, HTMLElement} from '../common/domStreamTypes';
import {DomStream} from './domStream';
import {addScripts} from './manifest';

export async function renderPage(
    res: Response, content: (document: Document, parent: HTMLElement) => Promise<void>) {
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
  await content(document, body);

  addScripts(document, body, 'main');

  domStream.end();
}
