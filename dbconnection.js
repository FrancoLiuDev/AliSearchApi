
// Database
var mysql = require('mysql');
var connection = mysql.createPool({
    multipleStatements: true,
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'alibaba'
});
module.exports = connection;
