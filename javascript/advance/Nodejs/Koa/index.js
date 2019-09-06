const Koa = require('./lib/application');
const serve = require('./lib/koa-static/index');
const path = require('path');
const router = require('./lib/koa-router/router')();
const app = new Koa();
const posts = [];

app.use(serve(path.join(__dirname, 'public'), {
  etag: true,
  maxage: 1000,
  lastModified: true,  // Just being explicit about the default.
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      // 设置HTML 文件不缓存， 其他的默认的是no-cache
      res.setHeader('Cache-Control', 'no-store');
    }
  },
}));

app.use(async (ctx, next) => {
  console.log('start===================')
  await next()
  console.log('end===================')
});

router
  //.get('/', list)
  .get('/post/new', list)
  .get('/post/:id', show)
  .post('/post', create);

app.use(router.routes());

async function list(ctx) {
  ctx.body = {
    list: posts
  };
}

async function add(ctx) {
  await ctx.render('new');
}

async function show(ctx) {
  const id = ctx.params.id;
  const post = posts[id];
  if (!post) ctx.throw(404, 'invalid post id');
  await ctx.render('show', { post: post });
}

async function create(ctx) {
  const post = ctx.request.body;
  const id = posts.push(post) - 1;
  post.created_at = new Date();
  post.id = id;
  ctx.redirect('/');
}

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}