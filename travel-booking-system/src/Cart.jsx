import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css'; // Import your CSS file

function Cart() {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const fetchCartAndDestinations = async () => {
            try {
                const userID = JSON.parse(localStorage.getItem("userID"));
                const response = await axios.get(`http://localhost:3001/api/getCart/${userID}`);

                if (response.data.cart && response.data.cart.items) {
                    const destinationIDs = response.data.cart.items.map(item => item.destinationID);

                    const destinationsResponse = await axios.post("http://localhost:3001/api/findAllDestinationByIDs", {
                        destinations: destinationIDs
                    });

                    setDestinations(destinationsResponse.data.data);
                }
            } catch (error) {
                console.error("Error fetching cart and destinations:", error.message);
            }
        };

        fetchCartAndDestinations();
    }, []);

    return (
        <div className="cart-container"> {/* Apply a container class for overall styling */}
            <h1>These are the Items you have added</h1>
            <p>Tick them to proceed</p>
            {destinations.map((itemCart) => (
                <div className="destination-item" key={itemCart._id}> {/* Apply a class for each destination item */}
                    <input type="checkbox" />
                    <h2>Destination: {itemCart.title}</h2>
                    <span>Description: {itemCart.description}</span>
                    {itemCart.photos && itemCart.photos.length > 0 && (
                        <img src={itemCart.photos[0].url} alt={itemCart.photos[0].caption} />
                    )}
                    <span>Price: {itemCart.price}</span>
                </div>
            ))}
            <button className="proceed-button">Proceed to Payment</button> {/* Use a button element for better accessibility */}
        </div>
    );
}

export default Cart;
