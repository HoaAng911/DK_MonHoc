const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/courses', courseController.getCourses);
router.get('/courses/register/:id', courseController.getRegisterForm);
router.post('/courses/register', courseController.registerCourse);
router.get('/courses/waiting/:id', courseController.getWaitingList);

module.exports = router;