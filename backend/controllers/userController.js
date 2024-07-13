const User = require('../models/userModel'); // Assuming you have a User model
const bcrypt = require('bcrypt'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For creating JWT tokens
const mongoose = require('mongoose');
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(username);
        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save user to the database
        await newUser.save();


        // Respond with the new user data and token
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Respond with the user data and token
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const forgetPassword = async (req, res) => {

}

const updateUserInfor = async (req, res) => {

    const { username, email, userID } = req.body;
    try {

        // Find the user by ID and update
        const user = await User.findByIdAndUpdate(userID, { username, email }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User information updated successfully', user });
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
const addToCart = async (req, res) => {
    const { userID, destinationID, destinationPrice } = req.body;

    try {
        // Find the user by ID
        const user = await User.findOne({ _id: userID });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add destinationID to cart.items
        if (!user.cart.items.some(item => item.destinationID === destinationID)) {
            user.cart.items.push({ destinationID });
            user.cart.totalMoney += destinationPrice;
        }

        // Save the updated user document
        await user.save();

        // Respond with success message or updated user object
        res.status(200).json({ message: 'Item added to cart successfully', user });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};





module.exports = { signup, login, forgetPassword, updateUserInfor, addToCart };