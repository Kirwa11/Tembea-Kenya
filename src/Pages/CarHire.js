import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Tab, Tabs, Form, Alert } from 'react-bootstrap';
import { cars } from '../data/Cars';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import app, { auth } from '../Firebase';

// Realtime Database instance from initialized app
const db = getDatabase(app);

const CarHire = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(null);

  // Check auth state on mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle Hire Now button click
  const handleHireClick = (car) => {
    if (!user) {
      setCurrentCar(car);
      setShowAuthModal(true);
      setError('');
      setSuccess('');
    } else {
      handleHireCar(car, user);
    }
  };

  // Handle car hire for authenticated user
  const handleHireCar = async (car, user) => {
    try {
      const hireRef = ref(db, `hires/${user.uid}/${car.id}`);
      await set(hireRef, {
        carName: car.name,
        price: car.price,
        timestamp: Date.now(),
        userId: user.uid,
        email: user.email
      });
      setSuccess(`Successfully hired ${car.name}!`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to hire car. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      // Save user details to Firebase Realtime Database
      await set(ref(db, `users/${newUser.uid}`), {
        email: newUser.email,
        name: name || 'Anonymous',
        createdAt: Date.now()
      });
      setSuccess('Registration successful! You are now logged in.');
      setShowAuthModal(false);
      setEmail('');
      setPassword('');
      setName('');
      handleHireCar(currentCar, newUser);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Login successful!');
      setShowAuthModal(false);
      setEmail('');
      setPassword('');
      handleHireCar(currentCar, userCredential.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="carhire-container">
      <h1 className="carhire-title">Car Hire Services</h1>
      {success && <Alert variant="success" className="alert-success">{success}</Alert>}
      {error && <Alert variant="danger" className="alert-danger">{error}</Alert>}
      <Row xs={1} md={2} lg={3} className="g-4">
        {cars.map((car) => (
          <Col key={car.id}>
            <Card className="car-card h-100">
              <Card.Img
                variant="top"
                src={car.img}
                alt={car.name}
                className="car-img"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="card-title">{car.name}</Card.Title>
                <Card.Text className="card-text">{car.description}</Card.Text>
                <ul className="car-specs">
                  <li>
                    <i className="fas fa-car me-1"></i>
                    {car.type}
                  </li>
                  <li>
                    <i className="fas fa-users me-1"></i>
                    {car.passengers} Passengers
                  </li>
                  <li>
                    <i className="fas fa-gear me-1"></i>
                    {car.transmission}
                  </li>
                </ul>
                <div className="car-price mt-auto">{car.price}</div>
                <Button
                  className="hire-btn"
                  onClick={() => handleHireClick(car)}
                >
                  Hire Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Auth Modal */}
      <Modal
        show={showAuthModal}
        onHide={() => setShowAuthModal(false)}
        centered
        className="auth-prompt-modal"
      >
        <Modal.Header className="auth-modal-header">
          <Modal.Title>Please Register or Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="register" className="mb-3">
            <Tab eventKey="register" title="Register">
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button className="auth-btn w-100" type="submit">
                  Register
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="login" title="Login">
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button className="auth-btn w-100" type="submit">
                  Login
                </Button>
              </Form>
            </Tab>
          </Tabs>
          {error && <Alert variant="danger" className="alert-danger mt-3">{error}</Alert>}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CarHire;