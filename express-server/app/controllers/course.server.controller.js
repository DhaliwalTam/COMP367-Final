 // Load the module dependencies
const Course = require('mongoose').model('Course');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey =config.secretKey;

// // Create a new error handling controller method
// const getErrorMessage = function(err) {
// 	// Define the error message variable
// 	var message = '';

// 	// If an internal MongoDB error occurs get the error message
// 	if (err.code) {
// 		switch (err.code) {
// 			// If a unique index error occurs set the message error
// 			case 11000:
// 			case 11001:
// 				message = 'coursename already exists';
// 				break;
// 			// If a general error occurs set the message error
// 			default:
// 				message = 'Something went wrong';
// 		}
// 	} else {
// 		// Grab the first error message from a list of possible errors
// 		for (const errName in err.errors) {
// 			if (err.errors[errName].message) message = err.errors[errName].message;
// 		}
// 	}

// 	// Return the message error
// 	return message;
// };

// Create a new course
exports.createCourse = function(req, res, next) {
    // Create a new instance of the 'Course' Mongoose model
    var course = new Course(req.body); // Get data from React form

    // Use the 'Course' instance's 'save' method to save a new course document
    course.save(function(err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(course);
        }
    });
};

// Returns all courses
exports.listCourses = function(req, res, next) {
    // Use the 'Course' instance's 'find' method to retrieve all course documents
    Course.find({}, function(err, courses) {
        if (err) {
            return next(err);
        } else {
            res.json(courses);
        }
    });
};

// Read a course by ID
exports.getCourseById = function(req, res) {
    // Use the 'response' object to send a JSON response
    res.json(req.course);
};

// Find a course by its ID
exports.findCourseById = function(req, res, next, id) {
    // Use the 'Course' static 'findOne' method to retrieve a specific course
    Course.findOne({
        _id: id
    }, (err, course) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Set the 'req.course' property
            req.course = course;
            // Call the next middleware
            next();
        }
    });
};

// Update a course by ID
exports.updateCourse = function(req, res, next) {
    const courseId = req.params.courseId;
    // Update the existing course document using the 'Course' instance's 'save' method
    Course.findByIdAndUpdate(courseId, req.body, { new: true }, function(err, updatedCourse) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response with the updated course
            res.json(updatedCourse);
        }
    });
};

// Delete a course by ID
exports.deleteCourse = function(req, res, next) {
    // Use the 'Course' instance's 'remove' method to delete a course document
    req.course.remove(function(err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(req.course);
        }
    });
};


// List all courses taken by a student
exports.listCoursesByStudent = function(req, res) {
    // Check if user is logged in
    if (!req.user) {
        return res.status(401).send({
            message: 'Unauthorized access: User not logged in'
        });
    }

    // If user is logged in, proceed to fetch courses
    Student.findById(req.user._id).populate('courses').exec((err, student) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            if (!student) {
                return res.status(404).send({
                    message: 'Student not found'
                });
            }
            res.status(200).json(student.courses);
        }
    });
};
