import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import BookingCard from './BookingCard';

async function fetchDestinations() {
    try {
        const response = await axios.get("http://localhost:3001/api/getAllDestinations");
        return response.data;
    } catch (error) {
        console.error('Error fetching destinations:', error);
        return [];
    }
}

function BookingCards() {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        async function getDestinations() {
            const data = await fetchDestinations();
            setDestinations(data);
        }
        getDestinations();
    }, []);

    return (
        <Container className="mt-5">
            <Row>
                {destinations.map((destination) => (
                    <Col key={destination._id} xs={12} md={6} lg={3} className="mb-4">
                        <BookingCard
                            title={destination.title}
                            price={destination.price}
                            description={destination.description}
                            photos={destination.photos}
                            comments={destination.comments}
                            ratings={destination.ratings}
                            id={destination._id}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default BookingCards;
