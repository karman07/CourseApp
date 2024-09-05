import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert({ show: true, message: 'Passwords do not match.', variant: 'danger' });
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/users/signup', { email, password });
      setAlert({ show: true, message: 'Signup successful! Please log in.', variant: 'success' });
    } catch (error) {
      setAlert({ show: true, message: 'Signup failed. Please try again.', variant: 'danger' });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 signup-container">
      <Card className="signup-card">
        <Card.Body>
          <h3>Signup</h3>
          {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Signup</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
