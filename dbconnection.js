
// Database
var mysql = require('mysql');
var connection = mysql.createPool({
    multipleStatements: true,
    host: '192.168.99.100',
    port: '3306',
    user: 'root',
    password: '123qweASD',
    database: 'alibaba'
});
module.exports = connection;
