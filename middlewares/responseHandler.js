const formatResponse = (code, msg, data = null) => ({
  code,
  msg,
  data
});

const responseHandler = (req, res, next) => {
  // 保留原始的 res.json 方法
  const originalJson = res.json;

  // 覆写 res.json 方法
  res.json = (body) => {
    // 解构 body，设置默认值
    const { code = 'A00006', msg = '操作成功', data = null } = body;
    // 使用 formatResponse 格式化响应
    const responseBody = formatResponse(code, msg, data);
    // 调用原始的 res.json 方法
    return originalJson.call(res, responseBody);
  };

  // 继续处理请求
  next();
};

module.exports = responseHandler;
