/**
 * 封装操作mysql的方法
 */
const mysql = require('mysql');

exports.base = (sql, data, callback) => {
    // 创建数据库连接
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'books' // 数据库名称
    });
    // 执行连接操作
    connection.connect();

    // 操作数据库（数据库操作是异步的）
    connection.query(sql, data, (error, results, fields) => {
        if (error) throw error;
        callback(results);
    });
}