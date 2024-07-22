const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      code: 'A00004',
      msg: '未提供令牌或令牌无效'
    });
  }

  if (!JWT_SECRET) {
    return res.status(500).json({
      code: 'A00007',
      msg: '服务器配置错误，未设置 JWT_SECRET'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      code: 'A00004',
      msg: '无效的令牌'
    });
  }
};

module.exports = authMiddleware;
