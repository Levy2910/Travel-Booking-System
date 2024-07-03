import React from 'react';
import BookingCard from './BookingCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function BookingCards() {
    return (

        <Container className="mt-5">
            <Row>
                <Col xs={6} md={4}>
                    <BookingCard />
                </Col>
                <Col xs={6} md={4}>
                    <BookingCard />
                </Col>

            </Row>
        </Container>
    );
}

export default BookingCards;