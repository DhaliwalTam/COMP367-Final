import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function UpdateCourse() {
  const [courseData, setCourseData] = useState({
    courseCode: '',
    courseName: '',
    section: '',
    semester: ''
  });
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
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
    const selectedCourseName = e.target.value;
    setCourseName(selectedCourseName);
    const selectedCourse = courses.find(course => course.courseName === selectedCourseName);
    if (selectedCourse) {
      setCourseData(selectedCourse);
    }
  };
  const [successMessage, setSuccessMessage] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      const courseId = courses.find(course => course.courseName === courseName)?._id;
      if (courseId) {
        const response = await axios.put(`/api/courses/${courseId}`, courseData);
        console.log('Course updated:', response.data);
        setSuccessMessage('Course updated successfully!');
      } else {
        console.error('Course not found:', courseName);
      }
    } catch (error) {
      console.error('Error updating course:', error); 
    }
  };

  return (
    <div>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <h2>Update Course</h2>
      <Form>
        <Form.Group controlId="courseSelect">
          <Form.Label>Select a Course</Form.Label>
          <Form.Control as="select" onChange={handleCourseChange}>
            <option value="">Select a Course</option>
            {courses.map((course) => (
               <option key={course._id} value={course.courseName}>
                {course.courseName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
      {courseData.courseName && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="section">
            <Form.Label>Section</Form.Label>
            <Form.Control type="text" name="section" value={courseData.section} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="semester">
            <Form.Label>Semester</Form.Label>
            <Form.Control type="text" name="semester" value={courseData.semester} onChange={handleChange} required />
          </Form.Group>
          <br></br>
          <Button variant="primary" type="submit">
            Update Course
          </Button>
        </Form>
      )}
      <Link to="/studentHome">
        <Button variant="secondary">Back to Student Home</Button>
      </Link>
    </div>
  );
}

export default UpdateCourse;
