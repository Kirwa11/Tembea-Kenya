// src/Pages/Places.js
import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Spinner, Alert } from 'react-bootstrap';
import { AuthContext } from '../Components/AuthContext';
import { db } from '../Firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import RegisterModal from '../Components/RegisterModal';
import LoginModal from '../Components/LoginModal';

// Import images
import place1 from '../assets/places/place1.jpeg';
import place2 from '../assets/places/place2.jpeg';
import place3 from '../assets/places/place3.jpeg';
import place4 from '../assets/places/place4.jpeg';

// ... rest of your Places.js code ...
const attractionCategories = [
  {
    id: 1,
    title: "Wildlife & Tourism",
    description: "Experience Kenya's incredible wildlife in their natural habitats.",
    image: place1,
    places: [
      {
        id: 1,
        name: "Maasai Mara National Reserve",
        description: "Famous for the Great Migration and Big Five wildlife viewing.",
        image: place1,
        rating: 4.8
      },
      // Add more places...
    ]
  },
  {
    id: 2,
    title: "Coastal Beaches",
    description: "Relax on Kenya's pristine white sandy beaches.",
    image: place2,
    places: [
      {
        id: 2,
        name: "Diani Beach",
        description: "One of the most beautiful beaches in Africa with crystal clear waters.",
        image: place2,
        rating: 4.7
      }
    ]
  },
  {
    id: 3,
    title: "Mountain Peaks",
    description: "Challenge yourself with Kenya's majestic mountains.",
    image: place3,
    places: [
      {
        id: 3,
        name: "Mount Kenya",
        description: "Africa's second highest peak with stunning glaciers and unique wildlife.",
        image: place3,
        rating: 4.9
      }
    ]
  },
  {
    id: 4,
    title: "Cultural Heritage",
    description: "Discover Kenya's rich cultural diversity.",
    image: place4,
    places: [
      {
        id: 4,
        name: "Lamu Old Town",
        description: "A well-preserved Swahili settlement with rich history and culture.",
        image: place4,
        rating: 4.6
      }
    ]
  }
];

export default function Places() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showPlaceDetails, setShowPlaceDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { currentUser } = useContext(AuthContext);

  // Clear success message after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  

  const handleInterest = async (place) => {
    if (!currentUser) {
      setShowLogin(true);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await setDoc(doc(db, 'interests', `${currentUser.uid}_${place.id}`), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        placeId: place.id,
        placeName: place.name,
        timestamp: serverTimestamp(),
        status: 'pending'
      });
      
      setSuccess(`Success! We've noted your interest in ${place.name}. We'll contact you soon!`);
      // Close the modal after successful submission
      setTimeout(() => {
        setShowPlaceDetails(false);
      }, 2000);
    } catch (error) {
      console.error('Error saving interest:', error);
      setError('Failed to save your interest. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewMore = (place) => {
    setSelectedPlace(place);
    setShowPlaceDetails(true);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Explore Kenya's Attractions</h1>
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
      
      <Row xs={1} md={2} lg={4} className="g-4">
        {attractionCategories.map((category) => (
          <Col key={category.id}>
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src={category.image} 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{category.title}</Card.Title>
                <Card.Text>{category.description}</Card.Text>
                <Button 
                  variant="primary" 
                  className="mt-auto"
                  onClick={() => handleViewMore(category)}
                >
                  View More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Place Details Modal */}
      <Modal show={showPlaceDetails} onHide={() => setShowPlaceDetails(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedPlace?.title} Destinations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row xs={1} md={2} className="g-4">
            {selectedPlace?.places.map((place) => (
              <Col key={place.id}>
                <Card>
                  <Card.Img 
                    variant="top" 
                    src={place.image} 
                    style={{ height: '150px', objectFit: 'cover' }} 
                  />
                  <Card.Body>
                    <Card.Title>{place.name}</Card.Title>
                    <div className="mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < Math.floor(place.rating) ? 'text-warning' : 'text-muted'}>★</span>
                      ))}
                      <span className="ms-2">{place.rating}</span>
                    </div>
                    <Card.Text>{place.description}</Card.Text>
                    <Button 
                      variant="primary" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInterest(place);
                      }}
                      className="w-100 position-relative"
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
                      ) : currentUser ? (
                        "I'm Interested"
                      ) : (
                        "Login to Show Interest"
                      )}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>

      {/* Auth Modals */}
<RegisterModal 
        show={showRegister} 
        handleClose={() => setShowRegister(false)} 
        showLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }} 
      />
      
      <LoginModal 
        show={showLogin} 
        handleClose={() => setShowLogin(false)} 
        showRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
    </Container>
  );
}