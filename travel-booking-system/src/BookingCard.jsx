import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

function BookingCard({ title, price, description, photos, comments, ratings }) {
    const [details, setDetails] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleClick = () => {
        setDetails(true);
    };

    const handleClose = () => {
        setDetails(false);
    };
    const handleNextSlide = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    const averageRating = ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 'No ratings yet';

    return (
        <Card className="card">
            <div className="card-img-container">
                <img src={photos[0]?.url || '/images/flinder.jpeg'} alt={photos[0]?.caption || 'Image'} />
            </div>
            <Card.Body className="card-body">
                <Card.Title className="card-title">{title}</Card.Title>
                <Card.Text className="card-text">
                    {description}
                    <br />
                    <strong>Price: </strong>${price}
                    <br />
                    <strong>Rating: </strong>{averageRating}
                </Card.Text>
                <Button className="card-button" variant="primary" onClick={handleClick}>View Details</Button>
            </Card.Body>
            {details &&
                <div>
                    <div className="detailCard-overlay" onClick={handleClose}></div>
                    <div className="detailCard">
                        <div className="slider">
                            <div className="slider-content">
                                <Card.Img variant="top" src={photos[currentImageIndex]?.url || '/images/flinder.jpeg'} alt={photos[currentImageIndex]?.caption || 'Image'} />
                                <Button onClick={handleNextSlide}>Next Slide</Button>
                            </div>
                        </div>
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>
                                {description}
                                <br />
                                <strong>Price: </strong>${price}
                                <br />
                                <strong>Rating: </strong>{averageRating}
                            </Card.Text>
                            <div>Comments: </div>
                            <ul className="listComment">
                                {comments.length > 0 ? comments.map((comment, index) => (
                                    <li key={index}>
                                        <strong>{comment.username}:</strong> {comment.text}
                                        <br />
                                        <small>{new Date(comment.date).toLocaleDateString()}</small>
                                    </li>
                                )) : <li>No comments yet</li>}
                            </ul>
                            <Button variant="primary" onClick={handleClose}>Close Details</Button>
                        </Card.Body>
                    </div>
                </div>
            }
        </Card>
    );
}

export default BookingCard;
