import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function CoursesTakenByStudent() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [courses, setCourses] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchCoursesByStudent = async (studentId) => {
    try {
      const response = await axios.get(`/api/students/${studentId}/courses`);
      setCourses(response.data);
      setShowDialog(false); // Hide dialog if courses found
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setShowDialog(true); // Show dialog for 404 error
      } else {
        console.error('Error fetching courses by student:', error);
      }
    }
  };

  const handleChange = (event) => {
    setSelectedStudent(event.target.value);
    fetchCoursesByStudent(event.target.value);
  };

  return (
    <div>
      <h2>List of Courses Taken by Student</h2>
      <label htmlFor="student">Select a Student:</label>
      <select id="student" value={selectedStudent} onChange={handleChange}>
        <option value="">Select a Student</option>
        {students.map((student) => (
          <option key={student._id} value={student._id}>
            {student.firstName} {student.lastName}
          </option>
        ))}
      </select>
      {showDialog && (
        <div>
          <p>No courses found for the selected student.</p>
        </div>
      )}
      {selectedStudent && (
        <div>
          <h3>Courses Taken by Selected Student:</h3>
          <ul>
            {courses.map((course) => (
              <li key={course._id}>{course.courseName}</li>
            ))}
          </ul>
        </div>
      )}
      <Link to="/studentHome">
        <Button variant="secondary">Back to Student Home</Button>
      </Link>
    </div>
  );
}

export default CoursesTakenByStudent;
