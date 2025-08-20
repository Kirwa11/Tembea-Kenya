import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { cars } from '../data/Cars';

const CarHire = () => {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Car Hire Services</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {cars.map((car) => (
          <Col key={car.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img 
                variant="top" 
                src={car.img} 
                alt={car.name}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{car.name}</Card.Title>
                <Card.Text>{car.description}</Card.Text>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">{car.type}</span>
                    <span className="badge bg-info text-dark">
                      <i className="fas fa-users me-1"></i>
                      {car.passengers}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">{car.transmission}</span>
                    <span className="fw-bold text-success">{car.price}</span>
                  </div>
                  <Button variant="success" className="w-100">
                    Hire Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CarHire;