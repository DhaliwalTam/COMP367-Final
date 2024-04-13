import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function ListStudents() {
    const [students, setStudents] = useState([]);
  
    useEffect(() => {
      fetchStudents();
    }, []);
  
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/students');
        setStudents(response.data);
        console.log('Students fetched successfully:', response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
        alert('Error fetching students. Please try again later.');
      }
    };
  
    return (
      <div>
        <h2>List of Students</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
            <th>Student Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            <th>Phone Number</th>
            <th>Program</th>
            <th>Favorite Topic</th>
            <th>Favorite Assignment</th>
            <th>Strongest Technical Skill</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.studentNumber}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>{student.address}</td>
              <td>{student.city}</td>
              <td>{student.phoneNumber}</td>
              <td>{student.program}</td>
              <td>{student.favoriteTopic}</td>
              <td>{student.favoriteAssignment}</td>
              <td>{student.strongestTechnicalSkill}</td>
            </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
  
  export default ListStudents;