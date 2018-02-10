/**
 * 配置路由规则
 */
const express = require('express');
const router = express.Router();
const service = require('./service.js');

// 首页
router.get('/', service.showIndex);
// 添加图书（跳转到图书页面）
router.get('/toAddBook', service.toAddBook);
// 添加图书（提交表单）
router.post('/addBook', service.addBook);
// 编辑图书（跳转到编辑页面）
router.get('/toEditBook', service.toEditBook);
// 编辑图书（提交表单）
router.post('/editBook', service.editBook);
module.exports = router;