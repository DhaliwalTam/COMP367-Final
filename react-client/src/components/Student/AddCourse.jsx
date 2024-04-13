import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Alert} from 'react-bootstrap';
import axios from 'axios';

function AddCourse() {
  const [courseData, setCourseData] = useState({
    courseCode: '',
    courseName: '',
    section: '',
    semester: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/courses', courseData);
      console.log('Course created:', response.data);
      setSuccessMessage('Course added successfully!');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div>
         {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <h2>Add Course</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="courseCode">
          <Form.Label>Course Code</Form.Label>
          <Form.Control type="text" name="courseCode" value={courseData.courseCode} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="courseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control type="text" name="courseName" value={courseData.courseName} onChange={handleChange} required />
        </Form.Group>
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
          Add Course
        </Button>
      </Form>
      <Link to="/studentHome">
        <Button variant="secondary">Back to Student Home</Button>
      </Link>
    </div>
  );
}

export default AddCourse;
