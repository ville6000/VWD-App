import Router from 'koa-router';

import categoryRouter from './category.router'

export default new Router()
	.use(categoryRouter.routes());
