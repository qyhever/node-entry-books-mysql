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
        if (result.affectedRows === 1) {
            res.redirect('/');
        }
    });
}
// 编辑图书（跳转到编辑页面）
exports.toEditBook = (req, res) => {
    let id = req.query.id;
    let sql = 'select * from books_sys where id=?';
    let data = [id];
    db.base(sql, data, result => {
        res.render('editBook', result[0]);
    });
}
// 编辑图书（提交表单）
exports.editBook = (req, res) => {
    let info = req.body;
    let sql = 'update books_sys set name=?,author=?,category=?,description=? where id=?';
    let data = [info.name, info.author, info.category, info.description, info.id];
    db.base(sql, data, result => {
        if (result.affectedRows === 1) {
            res.redirect('/');
        }
    });
}
// 删除图书
exports.deleteBook = (req, res) => {
    let id = req.query.id;
    let sql = 'delete from books_sys where id=?';
    let data = [id];
    db.base(sql, data, result => {
        if (result.affectedRows === 1) {
            res.redirect('/');
        }
    });
}