var courseController = require('../../app/controllers/course.server.controller');
var express = require('express');
var router = express.Router();

module.exports = function(app) {
    // Handle a get request made to /courses path
    // and list courses when /courses link is selected
    router.get("/courses", courseController.listCourses);

    // Handle a post request made to root path
    router.post('/courses', courseController.createCourse);

    // Set up the 'courses' parameterized routes 
    router.route('/courses/:courseId')
        .get(courseController.getCourseById)
        .put(courseController.updateCourse)
        .delete(courseController.deleteCourse);

    
    router.param('courseId', courseController.findCourseById);
 
    // List all courses taken by a student
    router.get('/coursesByStudent', courseController.listCoursesByStudent);
 

    // Register the router with the application
    app.use('/', router);
};
