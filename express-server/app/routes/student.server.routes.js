
var studentController = require('../../app/controllers/student.server.controller');
var express = require('express');
var router = express.Router();

module.exports = function(app) {
    // Handle a get request made to /students path
    // and list students when /students link is selected
    router.get("/students", studentController.listStudents); 

    // Handle a post request made to root path
    router.post('/', studentController.createStudent);

    // Set up the 'students' parameterized routes 
    router.route('/students/:studentId')
        .get(studentController.getStudentById)
        .put(studentController.updateStudent)
        .delete(studentController.deleteStudent);

    // Set up the 'studentId' parameter middleware
    // All param callbacks will be called before any handler of 
    // any route in which the param occurs, and they will each 
    // be called only once in a request - response cycle, 
    // even if the parameter is matched in multiple routes
    router.param('studentId', studentController.findStudentById);

    // Authenticate user
    router.post('/signin', studentController.authenticate);
    router.get('/signout', studentController.signout);
    router.get('/read_cookie', studentController.isSignedIn);
 //  list all courses taken by a student using student ID
 router.get("/students/:studentId/courses", studentController.listCoursesByStudentId);
    //  List all students taking a specific course
    router.get('/courses/:courseId/students', studentController.listStudentsByCourse);


    // Path to a protected page
    router.get('/welcome', studentController.welcome);

    // Register the router with the application
    app.use('/', router);
};
