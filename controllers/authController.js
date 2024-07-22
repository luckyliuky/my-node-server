const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ code: 'A00001', msg: '缺少必要的字段：email, password' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ code: 'A00004', msg: '无效的登录凭证' });
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ code: 'A00006', msg: '登录成功', data: { token } });
  } catch (error) {
    res.status(500).json({ code: 'A00004', msg: '登录时出错：' + error.message });
  }
};
