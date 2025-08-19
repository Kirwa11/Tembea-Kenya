import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import places from "../data/Places";

const Places = () => {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Explore Beautiful Places in Kenya</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {places.map((place) => (
          <Col key={place.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img 
                variant="top" 
                src={`/images/places/${place.image}`}
                alt={place.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{place.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {place.location} • ⭐ {place.rating}
                </Card.Subtitle>
                <Card.Text>{place.description}</Card.Text>
              </Card.Body>
              <Card.Footer className="bg-white border-0">
                <button className="btn btn-primary w-100">View Details</button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Places;