import express from 'express';
import parseurl from 'parseurl';
import send from 'send';
import {assertDefined} from '../common/check/defined';
import {assertNotNull} from '../common/check/null';
import {renderDay} from '../common/renderDay';
import {renderPage} from './renderPage';

const app: express.Express = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.route('/').get((req, res, next) => {
  renderPage(res, (document, body) => {
    renderDay(document, body);
  });
});
app.route('/month/:month').get((req, res, next) => {
  renderPage(res, (document, body) => {
    const p = document.createElement('p');
    body.append(p);
    p.append(`month = ${req.params.month}`);
  });
});
app.route('/dist/{/*path}').get((req, res) => {
  res.set('Cache-control', `public, max-age=${365 * 24 * 60 * 60}`);
  send(req, assertDefined(assertNotNull(parseurl(req)?.pathname)), {root: 'static'}).pipe(res);
});
app.route('{/*path}').get((req, res) => {
  send(req, assertDefined(assertNotNull(parseurl(req)?.pathname)), {root: 'static'}).pipe(res);
});

app.listen(process.env.PORT ?? 8082);
