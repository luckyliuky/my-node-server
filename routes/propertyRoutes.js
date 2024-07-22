const express = require('express');
const propertyController = require('../controllers/propertyController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// 上传房源信息路由（需要认证）
router.post('/add', authMiddleware, propertyController.addProperty);

module.exports = router;
