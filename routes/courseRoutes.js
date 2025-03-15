const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/', courseController.getCourses); // Sửa lại route này
router.get('/register/:id', courseController.getRegisterForm);
router.post('/register', courseController.registerCourse);
router.get('/waiting/:id', courseController.getWaitingList);
router.get('/courses/enrolled/:id', courseController.getEnrolledList);
module.exports = router;
