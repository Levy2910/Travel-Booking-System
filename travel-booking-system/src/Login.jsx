import React from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

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
    const [validated, setValidated] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (event) => {
        console.log(formData)
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/login', formData);
            console.log('Response:', response.data);
            // Handle successful response
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <Form className="formCss" noValidate validated={validated} onSubmit={handleSubmit}  >
            <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label >Email</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="levycaoesc14@gmail.com"
                    defaultValue="Vy"
                    className="fieldCss"
                    onChange={handleChange}
                    name='email'
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="123!@#"
                    defaultValue="123"
                    className="fieldCss"
                    onChange={handleChange}
                    name='password'
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Button className="buttonCss" type="submit">Submit</Button>
        </Form>
    );
}

export default Login;
