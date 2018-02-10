/**
 * 处理具体业务逻辑
 */
const path = require('path');
const fs = require('fs');
const db = require('./operate-mysql.js');

// 渲染主页面
exports.showIndex = (req, res) => {
    let sql = 'select * from books_sys';
    db.base(sql, null, result => {
        res.render('index', { list: result });
    });
}