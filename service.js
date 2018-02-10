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
// 添加图书（跳转到图书页面）
exports.toAddBook = (req, res) => {
    res.render('addBook', {}); 
}
// 添加图书（提交表单）
exports.addBook = (req, res) => {
    let info = req.body;
    let sql = 'insert into books_sys set ?';
    db.base(sql, info, result => {
        console.log(result);
        if (result.affectedRows == 1) {
            res.redirect('/');
        }
    });
}