import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';


 import AddCourse from './components/Student/AddCourse';
 import StudentHome from './components/Student/StudentHome';
import UpdateCourse from './components/Student/UpdateCourse';
import DropCourse from './components/Student/DropCourse';
import CoursesTakenByStudent from './components/Student/CoursesTakenByStudent';

 import AddStudent from './components/Admin/AddStudent';
 import ListStudents from './components/Admin/ListStudents';
 import ListCourses from './components/Admin/ListCourses';
import StudentsTakingCourse from './components/Admin/StudentsTakingCourse';

import Home from './components/Home';
import Login from './components/Auth/Login';



function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Student/Course System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
             
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              { <Nav.Link as={Link} to="/addStudent">Add a Student</Nav.Link>}
              <Nav.Link as={Link} to="/listStudents">List all students</Nav.Link>
              {/* <Nav.Link as={Link} to="/studentHome">Student Home</Nav.Link> */}
               <Nav.Link as={Link} to="/listCourses">List all courses</Nav.Link> 
            <Nav.Link as={Link} to="/studentsTakingCourse">List all students taking a specific course</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
      <div >
        <Routes>
        <Route index element={<Home />} />
          <Route path="home" element={<Home />} /> 
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
   
          <Route path="/studentHome" element ={< StudentHome />} />
          { <Route path="/addCourse" element={<AddCourse />} /> }
           <Route path="/updateCourse" element={<UpdateCourse />} /> 
           <Route path="/dropCourse" element={<DropCourse />} />
          <Route path="/listCourses" element={<ListCourses />} />
             <Route path="/addStudent" element={<AddStudent />} />
        <Route path="/listStudents" element={<ListStudents />} />
          <Route path="/coursesTakenByStudent" element={<CoursesTakenByStudent />} />
          <Route path="/studentsTakingCourse" element={<StudentsTakingCourse />} />  

        </Routes>
      </div>
    </Router>
  );
}

export default App;
