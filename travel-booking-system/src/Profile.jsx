import React, { useState, useEffect } from 'react';
import { Container, Button, Alert } from 'react-bootstrap'; // Import Alert from react-bootstrap
import axios from 'axios';
import './Profile.css'; // Make sure to import your CSS file

function Profile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userID, setUserID] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedUserID = localStorage.getItem('userID');
        const storedUserName = localStorage.getItem('userName');
        const storedEmail = localStorage.getItem('email');
        const parsedUserID = JSON.parse(storedUserID);
        const parsedUserName = JSON.parse(storedUserName);
        const parsedEmail = JSON.parse(storedEmail);
        if (storedUserID) setUserID(parsedUserID);
        if (storedUserName) setName(parsedUserName);
        if (storedEmail) setEmail(parsedEmail);
    }, []);

    const handleNameChange = (event) => setName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = { username: name, email, userID };
        console.log(formData)
        try {
            const response = await axios.post(`http://localhost:3001/api/updateUserInfor`, formData);
            localStorage.setItem('email', JSON.stringify(response.data.user.email));
            localStorage.setItem('userName', JSON.stringify(response.data.user.username));
            console.log(response.data); // Log response data if needed

            setSuccessMessage('User information updated successfully.');
            setErrorMessage(''); // Clear any previous error message

            // Optionally, reset form fields or perform any other UI update

        } catch (error) {
            console.error('Error updating user information:', error);
            setErrorMessage('Error updating user information. Please try again.');
            setSuccessMessage(''); // Clear any previous success message
        }
    };

    return (
        <>
            <h1>Profile Information</h1>
            <Container className="profile-container">
                <div>
                    <img src='/images/cool-profile-picture-minion-13pu7815v42uvrsg.jpg' alt="Profile" className="profile-image" />
                </div>
                <div className="profile-details">
                    <h2>{name}</h2>
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={name} onChange={handleNameChange} placeholder="Name" />
                        <input type="text" value={email} onChange={handleEmailChange} placeholder="Email" />
                        <Button type="submit">Save</Button>
                    </form>
                </div>
            </Container>
        </>
    );
}

export default Profile;
