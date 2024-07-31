const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const responseHandler = require('./middlewares/responseHandler');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// 连接数据库
connectDB();

// 中间件
app.use(express.json());
app.use(responseHandler);
pp.use('/uploads', express.static('uploads'));

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);

// 根路由
app.get('/', (req, res) => {
  res.json({ code: 'A00006', msg: '欢迎访问API' });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
