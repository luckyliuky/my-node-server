const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getWeChatSession = async (code) => {
  const { WECHAT_APPID, WECHAT_APPSECRET } = process.env;
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${WECHAT_APPID}&secret=${WECHAT_APPSECRET}&js_code=${code}&grant_type=authorization_code`;

  const response = await axios.get(url);
  return response.data;
};

exports.wechatLogin = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(200).json({ code: 'A00001', msg: '缺少微信授权码' });
  }

  try {
    // Step 1: Use code to get session_key and openid
    const { session_key, openid, errcode, errmsg } = await getWeChatSession(code);

    if (errcode) {
      return res.status(200).json({ code: 'A00004', msg: '获取微信授权信息失败: ' + errmsg });
    }

    // Step 2: Check if the user exists in the database
    let user = await User.findOne({ openid });

    if (!user) {
      // Create new user if not exists
      user = new User({
        openid,
        isAdmin: false // Default value, can be changed later
      });
      await user.save();
    }

    // Step 3: Generate JWT token
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ code: 'A00006', msg: '登录成功', data: { token } });
  } catch (error) {
    res.status(200).json({ code: 'A00004', msg: '微信登录时出错：' + error.message });
  }
};