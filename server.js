const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');
const homeRoutes = require('./routes/homeRoutes'); // Import route cho trang chủ
require('dotenv').config();

const app = express();

// Kết nối database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Thiết lập view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Routes
app.use('/', homeRoutes); // Route cho trang chủ
app.use('/courses', courseRoutes); // Route cho khóa học

// Khởi chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
