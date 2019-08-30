const Koa = require('./lib/application');
const serve = require('./lib/koa-static/index');
const path = require('path');
const router = require('./lib/koa-router/router')();
const app = new Koa();
const posts = [];

app.use(serve(path.join(__dirname, 'public')));

app.use(async (ctx, next) => {
  console.log('111111111111111111111')
  next()
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