const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// 登录路由
router.post('/wxLogin', authController.wechatLogin);

module.exports = router;
