// src/components/auth/RegisterModal.js
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { auth, db } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function RegisterModal({ show, handleClose, showLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    nationality: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: formData.name,
        nationality: formData.nationality,
        phone: formData.phone,
        email: formData.email,
        createdAt: new Date().toISOString()
      });

      handleClose();
      showLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nationality</Form.Label>
            <Form.Control
              type="text"
              name="nationality"
              required
              value={formData.nationality}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number (with country code)</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g., +254700000000"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              minLength={6}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength={6}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Register
          </Button>
        </Form>
        <div className="text-center mt-3">
          Already have an account?{' '}
          <Button variant="link" onClick={() => { handleClose(); showLogin(); }}>
            Login
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}