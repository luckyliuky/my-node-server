const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// 用户注册路由（不需要认证）
router.get('/register', userController.registerUser);

// 获取用户信息路由（需要认证）
router.get('/profile', authMiddleware, userController.getUserById);

// 获取所有用户信息路由（需要认证）
router.get('/all', authMiddleware, userController.getAllUsers);

// 更新用户信息路由（需要认证）
router.put('/update', authMiddleware, userController.updateUser);

module.exports = router;
