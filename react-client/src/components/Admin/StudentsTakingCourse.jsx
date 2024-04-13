import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

function CoursesByCourse() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCourseChange = async (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    try {
      const response = await axios.get(`/api/courses/${courseId}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error(`Error fetching students for course ${courseId}:`, error);
    }
  };

  return (
    <div>
      <h2>List of Students Taking a Specific Course</h2>
      <Form>
        <Form.Group controlId="courseSelect">
          <Form.Label>Select a Course</Form.Label>
          <Form.Control as="select" value={selectedCourse} onChange={handleCourseChange}>
            <option value="">Select a Course</option>
            {courses.map(course => (
              <option key={course._id} value={course._id}>
                {course.courseName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
      {students.length > 0 && (
        <div>
          <h3>Students Taking Selected Course:</h3>
          <ul>
            {students.map(student => (
              <li key={student.studentNumber}>{student.studentName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CoursesByCourse;
