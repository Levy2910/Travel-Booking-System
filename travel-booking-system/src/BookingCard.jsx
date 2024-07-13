import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';

function BookingCard({ title, price, description, photos, comments, ratings, id }) {
    const [details, setDetails] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [comment, setComment] = useState('');
    const [cmts, setCmts] = useState(comments);
    const [render, setRender] = useState(false);


    // global variable
    var userID = JSON.parse(localStorage.getItem('userID'));

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/getComment/${id}`);
                setCmts(response.data);
                console.log(render);
            } catch (e) {
                console.error('Error fetching comments', e);
            }
        };
        fetchComments();
    }, [render]);

    const handleClick = () => {
        setDetails(true);
    };

    const handleClose = () => {
        setDetails(false);
    };

    const handleNextSlide = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };
    const handleCart = async () => {
        const cartItems = {
            userID: userID,
            destinationID: id,
            destinationPrice: price
        };

        try {
            const response = await axios.post("http://localhost:3001/api/addToCart", cartItems);

            // Assuming your server responds with a message key for success
            if (response.data.message) {
                console.log("Success:", response.data.message);

                // Display success message on the screen
                const successMessage = document.createElement('p');
                successMessage.textContent = response.data.message;
                document.body.appendChild(successMessage);

                // Optionally, you can clear the message after a few seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000); // Remove after 3 seconds (3000 milliseconds)

            } else {
                console.log("Unknown response format:", response.data);
                // Handle unexpected server response
            }

        } catch (error) {
            console.error("Error adding to cart:", error.message);
            // Handle specific error cases or show a user-friendly message
        }
    };


    const handleComment = async () => {
        try {
            const storedUserName = JSON.parse(localStorage.getItem('userName'));
            const formData = {
                user: storedUserName,
                text: comment
            };
            const response = await axios.post(`http://localhost:3001/api/addComment/${id}`, formData);
            setRender(prev => !prev);
            setComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleChange = (e) => {
        setComment(e.target.value);
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
                                <Button onClick={handleCart}>Add to Cart</Button>
                                <Card.Img variant="top" src={photos[currentImageIndex]?.url || '/images/flinder.jpeg'} alt={photos[currentImageIndex]?.caption || 'Image'} />
                                <Button onClick={handleNextSlide} >Next Slide</Button>
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
                                {cmts.length > 0 ? cmts.map((comment, index) => (
                                    <li key={index}>
                                        <strong>{comment.username}:</strong> {comment.text}
                                        <br />
                                        <small>{new Date(comment.date).toLocaleDateString()}</small>
                                    </li>
                                )) : <li>No comments yet</li>}
                                <input type="text" placeholder='add your comment' value={comment} onChange={handleChange} />
                                <Button onClick={handleComment}>Add comment</Button>
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
