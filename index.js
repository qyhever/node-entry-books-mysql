/**
 * 入口文件
 */
const path = require('path');
const express = require('express');
const template = require('art-template');
const bodyParser = require('body-parser');
const router = require('./router.js');

const app = express();

// 启动静态资源服务
app.use('/www', express.static('public'));

// 整合模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');
app.engine('art', require('express-art-template'));

// 参数处理中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 路由
app.use(router);
app.listen(3000, () => {
    console.log('running...');
});