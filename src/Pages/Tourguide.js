import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal } from 'react-bootstrap';
import { FaMapMarkerAlt, FaStar, FaUser } from 'react-icons/fa';
import tourguide from '../data/Tourguide';

const Tourguide = () => {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleBookGuide = (guide) => {
    setSelectedGuide(guide);
    setShowModal(true);
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1>Professional Tour Guides</h1>
        <p className="text-muted">Connect with experienced local guides across Kenya's most beautiful destinations</p>
      </div>
      
      <Row xs={1} md={2} lg={3} className="g-4">
        {tourguide.map((guide) => (
          <Col key={guide.id}>
            <Card className="h-100 shadow-sm border-0 hover-shadow transition">
              <div 
                className="position-relative"
                style={{
                  height: '200px',
                  background: 'linear-gradient(45deg, #f8f9fa, #e9ecef)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
                  <FaUser className="text-muted" style={{ fontSize: '4rem', opacity: 0.3 }} />
                </div>
                <div className="position-absolute bottom-0 start-0 p-3 text-white w-100" style={{ 
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' 
                }}>
                  <div className="d-flex align-items-center">
                    <FaMapMarkerAlt className="me-2" />
                    <span>{guide.location}</span>
                  </div>
                </div>
              </div>
              
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h5 className="mb-0">{guide.name}</h5>
                    <div className="text-muted small">
                      <FaStar className="text-warning" /> 4.8 (24 reviews)
                    </div>
                  </div>
                  <Badge bg="light" text="dark" className="border">
                    {guide.role}
                  </Badge>
                </div>
                
                <div className="mt-auto pt-3">
                  <Button 
                    variant="outline-warning" 
                    className="w-100"
                    onClick={() => handleBookGuide(guide)}
                  >
                    Book Guide
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Booking Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book {selectedGuide?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedGuide && (
            <div>
              <p>You're about to book a tour with <strong>{selectedGuide.name}</strong> for <strong>{selectedGuide.location}</strong>.</p>
              <p>Please provide your contact details and preferred tour date.</p>
              {/* Add booking form here */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="warning" onClick={() => setShowModal(false)}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Tourguide;