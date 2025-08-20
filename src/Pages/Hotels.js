import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Spinner, Alert, Badge } from 'react-bootstrap';
import { hotelCategories } from '../data/HotelsData';


const Hotels = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleViewMore = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleShowInterest = (hotel) => {
    setSelectedHotel(hotel);
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const renderStars = (rating) => {
    return (
      <div className="mb-2">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < Math.floor(rating) ? 'text-warning' : 'text-muted'}>
            ★
          </span>
        ))}
        <span className="ms-2">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">🏨 Tourist Accommodation in Kenya</h1>
      
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          Interest registered! We'll contact you soon about {selectedHotel?.name}.
        </Alert>
      )}

      <Row xs={1} md={2} lg={3} className="g-4">
        {hotelCategories.map((category) => (
          <Col key={category.id}>
            <Card className="hotel-category-card">
              <div 
                className="hotel-category-img" 
                style={{ 
                  height: '200px', 
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} 
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{category.title}</Card.Title>
                <Card.Text className="text-muted">{category.description}</Card.Text>
                <Button 
                  variant="outline-primary" 
                  className="mt-auto"
                  onClick={() => handleViewMore(category)}
                >
                  View Options
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Category Details Modal */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row xs={1} md={2} className="g-4">
            {selectedCategory?.places?.map((place) => (
              <Col key={place.id}>
                <Card className="h-100">
                  <div 
                    className="hotel-img" 
                    style={{ 
                      height: '180px', 
                      backgroundImage: `url(${place.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} 
                  />
                  <Card.Body>
                    <Card.Title>{place.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <i className="fas fa-map-marker-alt me-1"></i>
                      {place.location}
                    </Card.Subtitle>
                    {renderStars(place.rating)}
                    <Card.Text className="small">{place.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Badge className="capacity-badge">
                        <i className="fas fa-users me-1"></i>
                        {place.capacity}
                      </Badge>
                      <Button 
                        variant="primary" 
                        size="sm"
                        className="btn-interest"
                        onClick={() => handleShowInterest(place)}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="me-2"
                            />
                            Processing...
                          </>
                        ) : (
                          'I\'m Interested'
                        )}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Hotels;