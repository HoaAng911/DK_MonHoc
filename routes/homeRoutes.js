const express = require('express');
const router = express.Router();
const Course = require('../models/course'); // Import model Course

// Route để hiển thị trang chủ với danh sách khóa học từ MongoDB
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find(); // Lấy tất cả khóa học từ database
        res.render('homepage', { courses }); // Gửi danh sách courses đến homepage.ejs
    } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
        res.status(500).send("Lỗi server");
    }
});

module.exports = router;
