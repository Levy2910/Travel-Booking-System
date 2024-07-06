const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define the Comment schema
const commentSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Define the Destination schema
const destinationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema], // An array of Comment schemas
    ratings: {
        type: [Number], // An array of numbers representing ratings
        validate: {
            validator: function (arr) {
                return arr.every(num => num >= 1 && num <= 5);
            },
            message: 'Ratings should be between 1 and 5.'
        }
    },
    photos: {
        type: [{
            url: String,
            caption: String
        }]
    }
});

// Create the Destination model
const Destination = mongoose.model('Destination', destinationSchema);


module.exports = Destination;