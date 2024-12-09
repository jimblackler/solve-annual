import {readFileSync} from 'fs';
import {assertDefined} from '../common/check/defined';
import type {Document, HTMLElement} from '../common/domStreamTypes';

type Manifest = {
  entries: { [key: string]: string[] };
};

const manifest = JSON.parse(readFileSync('out/webpack-manifest.json', 'utf-8')) as Manifest;

export function addScripts(document: Document, parent: HTMLElement, entry: string) {
  for (const file of assertDefined(manifest.entries[entry])) {
    const script = document.createElement('script');
    parent.append(script);
    script.setAttribute('type', 'module');
    script.setAttribute('src', `/dist/${file}`);
  }
}
