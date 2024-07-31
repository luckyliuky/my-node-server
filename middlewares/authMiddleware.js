const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(200).json({
      code: 'A00004',
      msg: '用户未登录'
    });
  }

  if (!JWT_SECRET) {
    return res.status(200).json({
      code: 'A00007',
      msg: '服务器JWT_SECRET错误'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(200).json({
      code: 'A00004',
      msg: '用户未登录'
    });
  }
};

module.exports = authMiddleware;
