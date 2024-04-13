import React from 'react';
import { Link } from 'react-router-dom';

function StudentHome() {
  return (
    <div>
      <h2>Student Home</h2>
      <ul>
        <li>
          <Link to="/addCourse">Add a Course</Link>
        </li>
        <li>
          <Link to="/updateCourse">Update a Course</Link>
        </li>
        <li>
          <Link to="/dropCourse">Drop a Course</Link>
        </li>
        <li>    
          <Link to="/coursesTakenByStudent">List all courses taken by a student</Link>
        </li>
        
      </ul>
    </div>
  );
}

export default StudentHome;
