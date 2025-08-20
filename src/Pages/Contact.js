import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    subject: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      topic: '',
      subject: ''
    });
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Contact Us</h1>
      
      <Row className="g-4">
        <Col lg={6}>
          <div className="p-4 shadow-sm rounded-3 h-100">
            <h3 className="mb-4">Get in Touch</h3>
            <p className="text-muted mb-4">
              Have questions about our tours or need assistance? Fill out the form and our team will get back to you as soon as possible.
            </p>
            
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box bg-light rounded-circle p-3 me-3">
                  <FaMapMarkerAlt className="text-primary" />
                </div>
                <div>
                  <h6 className="mb-0">Location</h6>
                  <p className="text-muted mb-0">Nairobi, Kenya</p>
                </div>
              </div>
              
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box bg-light rounded-circle p-3 me-3">
                  <FaPhone className="text-primary" />
                </div>
                <div>
                  <h6 className="mb-0">Phone</h6>
                  <p className="text-muted mb-0">+254 700 000000</p>
                </div>
              </div>
              
              <div className="d-flex align-items-center">
                <div className="icon-box bg-light rounded-circle p-3 me-3">
                  <FaEnvelope className="text-primary" />
                </div>
                <div>
                  <h6 className="mb-0">Email</h6>
                  <p className="text-muted mb-0">info@tembeakenya.com</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
        
        <Col lg={6}>
          <div className="p-4 shadow-sm rounded-3">
            {submitted ? (
              <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
                <Alert.Heading>Thank you!</Alert.Heading>
                <p>Your message has been sent successfully. We'll get back to you soon!</p>
              </Alert>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTopic">
                  <Form.Label>Topic *</Form.Label>
                  <Form.Select
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="booking">Booking Information</option>
                    <option value="custom">Custom Tour</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formSubject">
                  <Form.Label>Subject *</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="subject"
                    rows={4}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Your message here..."
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" className="py-2">
                    <FaPaperPlane className="me-2" />
                    Send Message
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;