import express from 'express';
import parseurl from 'parseurl';
import send from 'send';
import {assertDefined} from '../common/check/defined';
import {assertNotNull} from '../common/check/null';
import {mainHandler} from './handlers/mainHandler';

const app: express.Express = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.route('/').get(mainHandler);
app.route('/dist/{/*path}').get((req, res) => {
  res.set('Cache-control', `public, max-age=${365 * 24 * 60 * 60}`);
  send(req, assertDefined(assertNotNull(parseurl(req)?.pathname)), {root: 'static'}).pipe(res);
});
app.route('{/*path}').get((req, res) => {
  send(req, assertDefined(assertNotNull(parseurl(req)?.pathname)), {root: 'static'}).pipe(res);
});

app.listen(process.env.PORT ?? 8082);
