const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Course Schema
const CourseSchema = new Schema({
    courseCode: {
        type: String,
        required: true,
        trim: true
    },
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    section: {
        type: String,
        required: true,
        trim: true
    },
    semester: {
        type: String,
        required: true,
        trim: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

// Create the 'Course' model out of the 'CourseSchema'

module.exports = mongoose.model('Course', CourseSchema);














mongoose.model('Course', CourseSchema);
