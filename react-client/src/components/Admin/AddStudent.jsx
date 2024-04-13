import React, { useState } from 'react';
import { Form, Button,Alert } from 'react-bootstrap';
import axios from 'axios';

function AddStudent() {
  const [studentData, setStudentData] = useState({
    studentNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    phoneNumber: '',
    program: '',
    favoriteTopic: '',
    favoriteAssignment: '',
    strongestTechnicalSkill: '',
    password: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/', studentData);
      console.log('Student created successfully:', response.data);
      setSuccessMessage('Student added successfully!');
      setStudentData({
        studentNumber: '',
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        phoneNumber: '',
        program: '',
        favoriteTopic: '',
        favoriteAssignment: '',
        strongestTechnicalSkill: '',
        password: ''
    });
    } catch (error) {
      console.error('Error creating student:', error);
      console.log('Error creating student:', error);
      return next(error);
    }
  };

  return (
    <div>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
     <h2>Add Student</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="studentNumber">
          <Form.Label>Student Number</Form.Label>
          <Form.Control type="text" name="studentNumber" value={studentData.studentNumber} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="firstName" value={studentData.firstName} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="lastName" value={studentData.lastName} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={studentData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" name="address" value={studentData.address} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" name="city" value={studentData.city} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" name="phoneNumber" value={studentData.phoneNumber} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="program">
          <Form.Label>Program</Form.Label>
          <Form.Control type="text" name="program" value={studentData.program} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="favoriteTopic">
          <Form.Label>Favorite Topic</Form.Label>
          <Form.Control type="text" name="favoriteTopic" value={studentData.favoriteTopic} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="favoriteAssignment">
          <Form.Label>Favorite Assignment</Form.Label>
          <Form.Control type="text" name="favoriteAssignment" value={studentData.favoriteAssignment} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="strongestTechnicalSkill">
          <Form.Label>Strongest Technical Skill</Form.Label>
          <Form.Control type="text" name="strongestTechnicalSkill" value={studentData.strongestTechnicalSkill} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={studentData.password} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Student
        </Button>
      </Form>
    </div>
  );
}

export default AddStudent;
