import React, { useContext, useState } from 'react';
import { Form, Button, Container, InputGroup, Row, Col } from 'react-bootstrap';
import { primaryContext } from '../../context/PrimaryProvider';
import axios from 'axios'

const Login_SignUp = () => {
  const { isLoggedIn, setIsLoggedIn, users, setUsers } = useContext(primaryContext);
  const [user, setUser] = useState()

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [message, setMessage] = useState('');

  // ------------------------ SIGNUP -------------------------------//
  const handleSignUp = async (e) => {
    e.preventDefault();
    // sign-up logic here
    try {
      const response = await axios({
        url: "/server/signup",
        method: "POST",
        data: formData
      });
      setMessage(response.data.message || 'Signup successful!');
      setTimeout(setIsLoggedIn(true), 2000); // After sign-up
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error during signup.');
    }

  };

  // ------------------------ LOGIN ------------------------------// 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: "/server/login",
        method: "POST",
        data: formData
      });
      console.log(response);
      localStorage.setItem("user_token", response.data.token)
      if (response.data.dbUser) {
        setUser(response.data.dbUser)
      }
      setMessage(response.data.message || 'Login successful!');
      setTimeout(setIsLoggedIn(true), 2000); // After successful login
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error during signup.');
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      {!isLoggedIn ? (
        // Sign-up form
        <Form onSubmit={handleSignUp} className="w-100" style={{ maxWidth: "400px" }}>
          <h1 className="text-center mb-4">Sign Up</h1>
          <InputGroup className="mb-3">
            <InputGroup.Text />
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name='username'
              value={formData.username}
              onChange={handleChange}
            />
          </InputGroup>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                placeholder="Password"
                name='password'
                value={formData.password}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      ) : (
        // Login form
        <Form onSubmit={handleLogin} className="w-100" style={{ maxWidth: "400px" }}>
          <h1 className="text-center mb-4">Login</h1>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"></InputGroup.Text>
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      )}
      {message && <p>{message}</p>}
    </Container>
  );
};

export default Login_SignUp;
