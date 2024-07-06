const Destination = require('../models/destinationModel');

const addDestination = async (req, res) => {
    const destinationData = req.body;
    try {
        // Create a new destination instance
        const newDestination = new Destination(destinationData);

        // Save the destination to the database
        await newDestination.save();

        // Respond with the newly created destination
        res.status(201).json(newDestination);
    } catch (error) {
        console.error('Error adding destination:', error);
        res.status(500).json({ error: 'Failed to add destination' });
    }
}

const getAllDestinations = async (req, res) => {
    try {
        // Fetch all destinations from MongoDB
        const destinations = await Destination.find();

        // Send the fetched destinations as a JSON response
        res.status(200).json(destinations);
    } catch (error) {
        console.error('Error fetching destinations:', error);
        // Handle the error and send an error response
        res.status(500).json({ error: 'Failed to fetch destinations' });
    }
};
const deleteDestination = () => {
    // request to delete destination, if it's valid, we delete. 
}

module.exports = { addDestination, getAllDestinations, deleteDestination };