const Property = require('../models/Property');

exports.addProperty = async (req, res) => {
  const { title, description, price, location, available } = req.body;

  if (!title || !description || !price || !location || available === undefined) {
    return res.status(400).json({ code: 'A00001', msg: '缺少必要的字段：title, description, price, location, available' });
  }

  try {
    const property = new Property({ title, description, price, location, available });
    await property.save();
    res.status(201).json({ code: 'A00006', msg: '房源信息上传成功', data: property });
  } catch (error) {
    res.status(500).json({ code: 'A00004', msg: '上传房源信息时出错：' + error.message });
  }
};
