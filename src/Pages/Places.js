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

const attractionCategories = [
  {
    id: 1,
    title: "Wildlife & Tourism",
    description: "Experience Kenya's incredible wildlife in their natural habitats.",
    image: place2,
    places: [
      {
        id: 1,
        name: "Maasai Mara National Reserve",
        description: "Famous for the Great Migration and Big Five wildlife viewing.",
        image: place1,
        rating: 4.8
      },
    ]
  },
  {
    id: 2,
    title: "Coastal Beaches",
    description: "Relax on Kenya's pristine white sandy beaches.",
    image: place1,
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
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
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

  const handleViewMore = (category) => {
    if (!currentUser) {
      setShowAuthModal(true);
    } else {
      setSelectedCategory(category);
      setShowPlaceDetails(true);
    }
  };

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
        userName: currentUser.displayName || currentUser.email.split('@')[0], // Use displayName or fallback to email prefix
        userEmail: currentUser.email,
        placeId: place.id,
        placeName: place.name,
        timestamp: serverTimestamp(),
        status: 'pending'
      });

      setSuccess(`Success! ${currentUser.displayName || 'You'} have shown interest in ${place.name}. We'll contact you soon!`);
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

  return (
    <Container className="places-container py-5">
      <h1 className="places-title text-center mb-4">Explore Kenya's Attractions</h1>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

      <Row xs={1} md={2} lg={2} className="g-4">
        {attractionCategories.map((category) => (
          <Col key={category.id}>
            <Card className="place-card h-100">
              <Card.Img
                variant="top"
                src={category.image}
                className="place-img"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{category.title}</Card.Title>
                <Card.Text>{category.description}</Card.Text>
                <Button
                  variant="primary"
                  className="mt-auto view-more-btn"
                  onClick={() => handleViewMore(category)}
                >
                  View More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Auth Prompt Modal */}
      <Modal
        show={showAuthModal}
        onHide={() => setShowAuthModal(false)}
        centered
        size="sm"
        className="auth-prompt-modal"
      >
        <Modal.Header closeButton className="auth-modal-header">
          <Modal.Title className="auth-modal-title">Access Required</Modal.Title>
        </Modal.Header>
        <Modal.Body className="auth-modal-body">
          <p>Please log in or register to view place details.</p>
          <div className="auth-buttons">
            <Button
              variant="primary"
              className="auth-btn"
              onClick={() => {
                setShowAuthModal(false);
                setShowLogin(true);
              }}
            >
              Login
            </Button>
            <Button
              variant="outline-primary"
              className="auth-btn"
              onClick={() => {
                setShowAuthModal(false);
                setShowRegister(true);
              }}
            >
              Register
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Place Details Modal */}
      <Modal show={showPlaceDetails} onHide={() => setShowPlaceDetails(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory?.title} Destinations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row xs={1} md={2} className="g-4">
            {selectedCategory?.places.map((place) => (
              <Col key={place.id}>
                <Card className="place-card">
                  <Card.Img
                    variant="top"
                    src={place.image}
                    className="place-img place-img--sm"
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
                      className="w-100 interest-btn"
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