const formatResponse = (code, msg, data = null) => ({ code, msg, data });

const responseHandler = (req, res, next) => {
  const originalJson = res.json;

  res.json = ({ code = 'A00006', msg = '操作成功', data = null }) =>
    originalJson.call(res, formatResponse(code, msg, data));

  next();
};

module.exports = responseHandler;
