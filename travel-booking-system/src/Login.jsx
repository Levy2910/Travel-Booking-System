import React from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    return (
        <Container className="containerLogin text-white p-5 mt-5" >
            <div>
                <h1 className='title '>Login</h1>

                <Image src="./images/Plane.jpg" rounded />
            </div>
            {FormExample()}
        </Container>
    );
}

function FormExample() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/login', formData);
            console.log('Response:', response.data);
            localStorage.setItem('userData', JSON.stringify(response.data.user));
            navigate('/');

        } catch (error) {
            console.error('Error:', error);
            setError('Failed to sign in. Please check your credentials and try again.')
        }
    };

    return (
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
            <Button type='submit'> Sign In </Button>
            <div>Don't have an account yet? <Link to={'/signup'}>Sign Up here</Link> </div>
        </form>
    );
}

export default Login;
