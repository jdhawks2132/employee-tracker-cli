// connect to the mysql database

const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'employees',
});

connection.connect(function (err) {
	if (err) throw err;
	console.log('Connected!');
});

module.exports = connection;
