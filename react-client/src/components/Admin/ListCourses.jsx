import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function ListCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(response.data);
      console.log('Courses fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      alert('Error fetching courses. Please try again later.');
    }
  };

  return (
    <div>
      <h2>List of Courses</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Section</th>
            <th>Semester</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course._id}>
              <td>{course.courseCode}</td>
              <td>{course.courseName}</td>
              <td>{course.section}</td>
              <td>{course.semester}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListCourses;
