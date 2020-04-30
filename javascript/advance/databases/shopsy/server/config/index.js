const bunyan = require('bunyan');

const appname = 'Shopsy';

module.exports = {
  applicationName: appname,
  logger: bunyan.createLogger({ name: appname }),
  mongodb: {
    dsn: 'mongodb://localhost:27017/shopsy',
  },
  redis: {
    options: {
      port: 6379, // Redis port
      host: "127.0.0.1", // Redis host
      // family: 4, // 4 (IPv4) or 6 (IPv6)
      // password: "123456",
      db: 0,
    },
  },
  mysql: {
    options: {
      host: 'localhost',
      // port: 3406,
      database: 'shopsy',
      dialect: 'mysql',
      username: 'root',
      password: 'password',
    },
  },
};

	// let connection = mysql.createConnection({
	// 	host: 'localhost',
	// 	database: 'imooc_safety',
	// 	user: 'root',
	// 	password: 'password'
	// });