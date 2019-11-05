const Koa = require('koa');
const app = new Koa();

const koaStatic = require('koa-static');
const whiteRefersList = /^http:\/\/localhost:9000\//
app.use(koaStatic('./static', {
	hidden: true,
	maxage: 365*24*3600*1000
}));
// 1. 检查请求头的referer, 某些请求只有指定的referer 才能请求
// app.use(async (ctx, next) => {
// 	var referer = ctx.req.headers.referer
// 	if (referer) {
// 		if (whiteRefersList.test(referer)) {
// 			await next();
// 		} else {
// 			ctx.res.end("fail")
// 		}
// 	} else {
// 		await next();
// 	}
	
// })
// 2. Anti CSRF Token， 设置一个token , 在请求是携带对应的token 作为参数， 第三网站不能获取对应的token

// 3, 设置cookies samesite true, 防止第三方网站请求携带cookies ： ctx.cookies.set('userId', user.id, {httpOnly:true, domain: 'localhost',  sameSite: true});
// 设置sameSite没有工作， 是因为我们localhost:9000 和localhost:8080 有相同的domain: localhost, 所以在生成的cookies，会在：localhost:9000和localhost:8080都生成了。
// 但是localhost 和127.0.0.1却又是不同的domain

// 4. 验证码的处理， 不够友好
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const Pug = require('koa-pug');
/*const pug = */new Pug({
	app,
	viewPath: './views',
	noCache: process.env.NODE_ENV === 'development'
});

const routes = ['site', 'user'];
routes.forEach((route) => {
	app.use(require(`./routes/${route}`).routes());
});

app.listen(9000, function(){
	console.log('App is listening on port 9000');
});
