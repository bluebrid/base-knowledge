const mysql = require('mysql');
exports.getConnection = function(){
	let connection = mysql.createConnection({
		host: 'localhost',
		database: 'imooc_safety',
		user: 'root',
		password: 'password'
	});
	connection.connect();
	return connection;
};
