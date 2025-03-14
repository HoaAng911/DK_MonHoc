const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');
require('dotenv').config();

const app = express();

// Kết nối database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Thiết lập view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', courseRoutes);

// Khởi chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
    res.redirect('/courses'); // Chuyển hướng đến danh sách môn học
});