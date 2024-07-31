const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const { name, tel, password, age, isAdmin } = req.query; // 从查询参数中获取数据

  if (!name || !tel || !password || !age) {
    return res.status(200).json({ code: 'A00001', msg: '缺少必要的字段：name, tel, password, age' });
  }

  try {
    const existingUser = await User.findOne({ tel });
    if (existingUser) {
      return res.status(200).json({ code: 'A00002', msg: '用户已注册' });
    }

    const user = new User({ name, tel, password, age, isAdmin:isAdmin || false });
    await user.save();
    res.status(200).json({ code: 'A00006', msg: `用户 ${name} 注册成功` });
  } catch (error) {
    res.status(200).json({ code: 'A00004', msg: '注册用户时出错：' + error.message });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(200).json({ code: 'A00005', msg: '用户未找到' });
    }

    res.status(200).json({ code: 'A00006', msg: '获取用户信息成功', data: user });
  } catch (error) {
    res.status(200).json({ code: 'A00004', msg: '获取用户信息时出错：' + error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ code: 'A00006', msg: '获取所有用户信息成功', data: users });
  } catch (error) {
    res.status(200).json({ code: 'A00004', msg: '获取所有用户信息时出错：' + error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { name, tel, age } = req.body;
  const userId = req.user.id;

  try {
    const updateData = {};
    if (name) updateData.name = name;
    if (tel) updateData.tel = tel;
    if (age) updateData.age = age;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });

    if (!updatedUser) {
      return res.status(200).json({ code: 'A00005', msg: '用户未找到' });
    }

    res.status(200).json({ code: 'A00006', msg: `用户 ${updatedUser.name} 信息更新成功`, data: updatedUser });
  } catch (error) {
    res.status(200).json({ code: 'A00004', msg: '更新用户信息时出错：' + error.message });
  }
};
