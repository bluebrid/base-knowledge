1. npm install
2. npm start
3. cd csrf
4. http-server -p 8080
5. http://localhost:9000/user/login // 登录系统
6. 打开一篇文章, 然后提交comment: <a href=http://127.0.0.1:8080/index.html>点击我购买优惠券0001</a>
7. 点击comment连接， 则完成了一次csrf 攻击
