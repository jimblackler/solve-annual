import express from 'express';
import asyncHandler from 'express-async-handler';
import parseurl from 'parseurl';
import send from 'send';
import {assertDefined} from '../common/check/defined';
import {assertNotNull} from '../common/check/null';
import {renderDay} from './renderDay';
import {renderPage} from './renderPage';

const app: express.Express = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.route('/').get(asyncHandler(async (req, res, next) => {
  const date = new Date();
  await renderPage(res, async (document, body) => {
    await renderDay(document, body, date.getMonth() + 1, date.getDate());
  });
}));
app.route('/day/:month/:day').get(asyncHandler(async (req, res, next) => {
  res.set('Cache-control', `public, max-age=${5 * 24 * 60 * 60}`);
  const month = Number.parseInt(req.params.month);
  const day = Number.parseInt(req.params.day);
  if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
    const date = new Date(2024, month - 1, day, 0, 0, 0, 0);
    if (date.getMonth() === month - 1 && date.getDate() === day) {
      await renderPage(res, async (document, body) => {
        await renderDay(document, body, month, day);
      });
      return;
    }
  }
  next();
}));
app.route('/dist/{/*path}').get((req, res) => {
  res.set('Cache-control', `public, max-age=${365 * 24 * 60 * 60}`);
  send(req, assertDefined(assertNotNull(parseurl(req)?.pathname)), {root: 'static'}).pipe(res);
});
app.route('{/*path}').get((req, res) => {
  send(req, assertDefined(assertNotNull(parseurl(req)?.pathname)), {root: 'static'}).pipe(res);
});

app.listen(process.env.PORT ?? 8082);
