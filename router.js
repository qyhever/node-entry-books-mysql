/**
 * 配置路由规则
 */
const express = require('express');
const router = express.Router();
const service = require('./service.js');

router.get('/', service.showIndex);

module.exports = router;