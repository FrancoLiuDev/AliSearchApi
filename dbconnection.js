
// Database
var mysql = require('mysql');
var connection = mysql.createPool({
    multipleStatements: true,
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123qweASD',
    database: 'alibaba'
});
module.exports = connection;
