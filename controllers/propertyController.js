const House = require('../models/Property');

exports.addProperty = async (req, res) => {
  const { title, description, price, location, available } = req.body;

  if (!title || !description || !price || !location || available === undefined) {
    return res.status(200).json({ code: 'A00001', msg: '缺少必要的字段：title, description, price, location, available' });
  }

  try {
    const userId = req.user.id; // 从JWT验证后的req.user中获取用户ID
    const house = new House({ title, description, price, location, available, userId });
    await house.save();
    res.status(200).json({ code: 'A00006', msg: '房源信息上传成功', data: house });
  } catch (error) {
    res.status(200).json({ code: 'A00004', msg: '上传房源信息时出错：' + error.message });
  }
};

exports.getUserHouses = async (req, res) => {
  try {
    const userId = req.user.id;
    const houses = await House.find({ userId });

    res.json({
      code: 'A00006',
      msg: '获取成功',
      data: houses
    });
  } catch (error) {
    res.status(200).json({
      code: 'A00004',
      msg: '获取房源信息失败：' + error.message
    });
  }
};

exports.getAllHousesWithOwners = async (req, res) => {
  const { title } = req.query;

  try {
    let query = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' }; // 模糊搜索，不区分大小写
    }

    const houses = await House.find(query).populate('userId', 'name email');
    res.status(200).json({ code: 'A00006', msg: '获取成功', data: houses });
  } catch (error) {
    res.status(200).json({ code: 'A00004', msg: '获取房源信息时出错：' + error.message });
  }
};