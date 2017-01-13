import Koa from 'koa'; // const koa = export('koa')
import Router from 'koa-router';
import Knex from 'knex';
import Parser from 'koa-bodyparser';

import router from './router/router';

const app = new Koa();

app.context.db = new Knex({
  client: 'sqlite3',
  connection: {
    filename: './kanta.sqlite3'
  }
});

app
	.use(new Parser())
	.use(router.routes())
	.use((ctx) => {
		ctx.response.set('Content-Type', 'application/json; utf-8');
	});

app.listen(8080);
