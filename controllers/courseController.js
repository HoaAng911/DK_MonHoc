const Course = require('../models/course');
const Student = require('../models/student');
const Registration = require('../models/registration');

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.render('courseList', { courses });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getRegisterForm = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.render('registerCourse', { course });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.registerCourse = async (req, res) => {
    const { studentId, courseId } = req.body;

    try {
        const course = await Course.findById(courseId);
        const student = await Student.findOne({ studentId });

        if (!course || !student) {
            return res.status(404).send('Course or Student not found');
        }

        if (course.enrolled < course.capacity) {
            course.enrolled += 1;
            const registration = new Registration({
                student: student._id,
                course: course._id,
                status: 'enrolled'
            });
            await registration.save();
            await course.save();
            res.send('Registration successful!');
        } else {
            if (!course.waitingList.includes(student._id)) {
                course.waitingList.push(student._id);
            }
            const registration = new Registration({
                student: student._id,
                course: course._id,
                status: 'waiting'
            });
            await registration.save();
            await course.save();
            res.send('Course is full. You have been added to the waiting list.');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getWaitingList = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('waitingList');
        res.render('waitingList', { course });
    } catch (err) {
        res.status(500).send(err.message);
    }
};
exports.getEnrolledList = async (req, res) => {
    try {
        const courseId = req.params.id;

        // Tìm thông tin khóa học
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).send('Course not found');
        }

        // Tìm danh sách đăng ký với trạng thái 'enrolled' và populate thông tin sinh viên
        const enrolledRegistrations = await Registration.find({
            course: courseId,
            status: 'enrolled'
        }).populate('student');

        // Tạo danh sách sinh viên đã đăng ký từ các bản ghi đăng ký
        const enrolledList = enrolledRegistrations.map(registration => ({
            studentId: registration.student.studentId,
            name: registration.student.name
        }));

        // Render trang giao diện với thông tin khóa học và danh sách sinh viên
        res.render('enrolledList', { course, enrolledList });
    } catch (err) {
        res.status(500).send(err.message);
    }
};