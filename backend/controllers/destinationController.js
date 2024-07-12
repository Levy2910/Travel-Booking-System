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
const addComment = async (req, res) => {
    try {
        const destinationID = req.params.destinationID;
        const { user: username, text, date } = req.body;

        const destination = await Destination.findByIdAndUpdate(destinationID, {
            $push: { comments: { username, text, date } }
        }, { new: true });

        if (!destination) {
            return res.status(404).send('Destination not found');
        }

        res.status(200).json(destination);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send('Internal Server Error');
    }
};
const getComments = async (req, res) => {
    const destinationID = req.params.destinationID;
    try {
        const destination = await Destination.findById(destinationID);
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        // Assuming comments are stored within the destination document
        const comments = destination.comments;
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { addDestination, getAllDestinations, deleteDestination, addComment, getComments };