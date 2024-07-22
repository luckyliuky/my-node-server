const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// 登录路由
router.post('/login', authController.loginUser);

module.exports = router;
