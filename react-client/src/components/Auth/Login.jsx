import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../Auth/login.css';
import axios from 'axios';
import View from '../Auth/View';

function App() {
  const [screen, setScreen] = useState('auth');
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const apiUrl = '/api/signin';

  const authenticateUser = async () => {
    try {
      const loginData = { auth: { studentNumber, password } };
      console.log('Login Data:', loginData);
      const res = await axios.post(apiUrl, loginData);
      console.log(res.data.auth)
      console.log(res.data.screen)
      if (res.data.screen !== undefined) {
        console.log('Login successful!');
        setScreen('studentHome');
        setIsLoggedIn(true);
        // setSuccessMessage('Login successful! Redirecting to student home...');
      }
    } catch (error) {
      console.error('Error authenticating user:', error);
      setScreen('auth');
      setSuccessMessage('');
    }
  };

  const readCookie = async () => {
    try {
      const res = await axios.get('/api/read_cookie');
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
      }
    } catch (error) {
      console.error('Error reading cookie:', error);
      setScreen('auth');
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <div className="App">
      {screen === 'auth' ? (
        <div>
          <h2>Login</h2>
          <Form>
            <Form.Group size="lg">
              <Form.Label>Student Number</Form.Label>
              <Form.Control
                type="text"
                name="studentNumber"
                id="studentNumber"
                placeholder="Enter student number"
                onChange={(e) => setStudentNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <br />
            <Button size="lg" variant="primary" type="Button" onClick={authenticateUser}>
              Login
            </Button>
          </Form>
        </div>
      ) : (
        <View screen={screen} setScreen={setScreen} isLoggedIn={isLoggedIn} />
      )}
      {successMessage && <p>{successMessage}</p>}
    </div>
    
  );
}

export default App;
