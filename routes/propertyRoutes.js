const express = require('express');
const propertyController = require('../controllers/propertyController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// 上传房源信息（需要登录）
router.post('/add', authMiddleware, propertyController.addProperty);

router.get('/get', authMiddleware, propertyController.getUserHouses);

router.get('/all', propertyController.getAllHousesWithOwners);

module.exports = router;
