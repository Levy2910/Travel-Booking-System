import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Image from 'react-bootstrap/esm/Image';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formData)
            const responseData = await axios.post('http://localhost:3001/api/signup', formData)
            console.log(responseData)
            navigate('/login')
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    }
    return (
        <Container className="containerLogin text-white p-5 mt-5" >
            <div>
                <h1 className='title'>Sign Up</h1>
                <Image src="./images/SignupImage.jpg" style={{ width: '700px', height: '500px' }} rounded />
            </div>
            <form className="signupForm" onSubmit={handleSubmit}>
                {error && <p className="error">{error}</p>}
                <fieldset>
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" id="email" onChange={handleChange} />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password: </label>
                    <input type="text" name="password" id="password" onChange={handleChange} />
                </fieldset>
                <fieldset>
                    <label htmlFor="name">Name: </label>
                    <input type="name" name="username" id="name" onChange={handleChange} />
                </fieldset>
                <Button type="submit"> Sign Up </Button>
            </form>
        </Container>
    );
}

export default Signup;