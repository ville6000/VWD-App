import Router from 'koa-router';

export default new Router({prefix: '/categories'})
	.get('/', async (ctx, next) => {
		const offset = ctx.request.query.offset || 0;
		const limit = ctx.request.query.limit || 0;
		const categories = await ctx.db.raw(
			'SELECT * FROM category' + (offset || limit > 0 ? ' LIMIT :limit OFFSET :offset' : ''),
			{
				limit: limit,
				offset: offset
			}
		);
		await next();
		ctx.body = categories.map(category =>
			Object.assign(
				{},
				category,
				{
					url: `${ctx.request.host + ctx.request.path}/${category.id}`,
					notesUrl: `${ctx.request.host + ctx.request.path}/${category.id}/notes`,
				}
			)
		);
	})
	.get('/:id', async (ctx, next) => {
		const category = await ctx.db.raw('SELECT * FROM category WHERE id = ?', ctx.params.id);
		await next();
		ctx.body = Object.assign(
			{},
			category,
			{
				url: `${ctx.request.host + ctx.request.path}/${category.id}`,
				notesUrl: `${ctx.request.host + ctx.request.path}/${category.id}/notes`
			}
		);
	})
	.post('/', async (ctx, next) => {
		try {
			await ctx.db.raw('INSERT INTO category (name) VALUES (:name)', ctx.request.body);
			ctx.status = 201;
		} catch(err) {
			ctx.status = 400;
		}
	})
	.put('/:id', async (ctx, next) => {
		try {
			await ctx.db.raw('UPDATE category SET name = IFNULL(:name, name) WHERE id = :id', {
				id: ctx.params.id,
				name: ctx.request.body.name
			});
			ctx.status = 202;
		} catch (err) {
			ctx.status = 400;
		}
	});
