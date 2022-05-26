[如何在生产环境中运行PM2和Node.js](https://baijiahao.baidu.com/s?id=1640908710997667777&wfr=spider&for=pc)

1. supervisor 是开发环境用
2. forever 管理多个站点，每个站点访问量不大，不需要监控
3. nodemon 是开发环境使用， 修改自动重启
4. pm2 网站访问量大，需要比较完整的监控

## [PM2的有点](https://www.cnblogs.com/zhoujie/p/nodejs4.html)
1. 内建了负载均衡(使用node cluster 集群模块)
2. 后台运行
3. 0秒停机重载(维护升级的时候不需要停机)
4. 兼容不同的OS
5. 停止不稳定的进程(避免无线循环启动不稳定的进程)
6. 后台检测
7. 提供http API 
8. 远程控制和实时的接口API(NODEjs 模块，允许和PM2进程进行交互)

脚本:

1. pm2 start app.js
2. pms restart app.js
3. pm2 stop app.js
4. pm2 list 
5. pm2 desc 0 // 0 对应ID，查看启动程序的详细信息
6. pm2 monit // 可以得到进程(以及集群)的CPU的使用率和内存占用(ctrl +c 退出)
7. pm2 web 运行健壮的 computer API endpoint (http://localhost:9615)
8. pm2 logs 显示所有进程日志
9. pm2 stop all 停止所有进程
10. pm2 restart all 重启所有进程
11.  pm2 reload all 0秒停机重载进程 (用于 NETWORKED 进程)
12. pm2 stop 0 停止指定的进程
13. pm2 restart 0 重启指定的进程
14. pm2 delete 0 杀死指定的进程
15. pm2 delete all 杀死全部进程


运行进程的不同方式：
$ pm2 start app.js -i max 根据有效CPU数目启动最大进程数目
$ pm2 start app.js -i 3 启动3个进程
$ pm2 start app.js -x 用fork模式启动 app.js 而不是使用 cluster
$ pm2 start app.js -x -- -a 23 用fork模式启动 app.js 并且传递参数 (-a 23)
$ pm2 start app.js --name serverone 启动一个进程并把它命名为 serverone
$ pm2 stop serverone 停止 serverone 进程
$ pm2 start app.json 启动进程, 在 app.json里设置选项
$ pm2 start app.js -i max -- -a 23 在--之后给 app.js 传递参数
$ pm2 start app.js -i max -e err.log -o out.log 启动 并 生成一个配置文件