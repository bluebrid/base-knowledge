const bluebird = require('bluebird');
const connectionModel = require('../models/connection');

exports.login = async function(ctx, next){
	ctx.render('login');
};

exports.doLogin = async function(ctx, next){
	try{

		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// 如果用反引号进行脚本的拼接，而且对应的参数会换行，则不会脚本注入，如果是同一行就会脚本注入
		// const results = await query(
		// 	`select * from user where
		// 	username = '${data.username}'
		// 	and password = '${data.password}'`
		// );
		// const results = await query(
		// 	`select * from user where username = '${data.username}'	and password = '${data.password}'`
		// );
		const results = await query(
			"select * from user where username = '"+ data.username +"'	and password = '"+ data.password +"'"
		);
		if(results.length){
			let user = results[0];

			/**
			 * Chrome 浏览器（79）：https://www.acunetix.com/blog/articles/chrome-tightens-csrf-protection/
			 * 1. 如果在没有设置sameSite 为true 的情况下：
			 * 	  http://localhost:8080/index.html 是会携带Cookies
			 * 	  http://127.0.0.1:8080/index.html 是不会携带Cookes
			 * 2. 如果设置sameSite 为true的情况下:
			 * 	  http://localhost:8080/index.html 是会携带Cookies
			 *    http://127.0.0.1:8080/index.html 是不会携带Cookes
			 * Edge浏览器：
			 * 1. 如果在没有设置sameSite 为true 的情况下：
			 * 	  http://localhost:8080/index.html 是会携带Cookies
			 * 	  http://127.0.0.1:8080/index.html 是会携带Cookes
			 * 2. 如果设置sameSite 为true的情况下:
			 * 	  http://localhost:8080/index.html 是会携带Cookies
			 *    http://127.0.0.1:8080/index.html 是不会携带Cookes
			 *  
			 *  区别：
			 *  如果在没有设置sameSite或者其值为false 的情况下， Edge是一定会携带Cookies 的，但是Chrome只有在相同的域的情况下才会携带， 
			 *  为什么chrome 在没有设置sameSite 的情况下， 仍然不会携带Cookies呢， 是因为在Chrome76之后的版本chrome://flags/#same-site-by-default-cookies默认设置为default,
			 *  如果我们要测试CSRF在Chrome的效果，可以将SameSite by default cookies的值设置为：Disabled, 可以参考：https://www.acunetix.com/blog/articles/chrome-tightens-csrf-protection/
			 *  
			 */
			// 登录成功，设置cookie
			ctx.cookies.set('userId', user.id, {
				// domain: 'localhost', // Sec-Fetch-Site: cross-site 浏览器好像通过这个属性， 默认阻止携带cookies
				httpOnly: false, 
				// sameSite: true, // Strict, Lax , true, false
				/**
				 * SameSite=Strict: The cookie is only sent if you are currently on the site that the cookie is set for. If you are on a different site and you click a link to a site that the cookie is set for, the cookie is not sent with the first request.
					SameSite=Lax: The cookie is not sent for embedded content but it is sent if you click on a link to a site that the cookie is set for. It is sent only with safe request types that do not change state, for example GET.
					SameSite=None: The cookie is sent even for embedded content. This is also the current behavior of all browsers if the SameSite attribute is not set.
				 */
			});

			ctx.body = {
				status: 0,
				data:{
					id: user.id,
					name: user.name
				}
			};
		}else{
			throw new Error('登录失败');
		}

		connection.end();
	}catch(e){
		console.log('[/user/login] error:', e.message, e.stack);
		ctx.body = {
			status: e.code || -1,
			body: e.message
		};
	}
};
