import React, { useState, useEffect } from 'react'
import Navbar from "../src/components/Navbar";
import { Form, Button } from 'react-bootstrap';
import Question from '../src/services/QuestionService';

function QuestionForm() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {

        }

        setValidated(true);
    };

    return (
        <>
            <Navbar />
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="questionForm mx-auto">
                <h1>Submit Your Question</h1>
                <Form.Group controlId="validationCustom01">
                    <Form.Label className="label">Question:</Form.Label>
                    <Form.Control required className="question" type="text" placeholder="Type Your Question Here" />
                    <Form.Control.Feedback className="feedback">Question Looks Good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid" className="feedback">Question is Empty!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom02">
                    <Form.Label className="label">Description:</Form.Label>
                    <Form.Control required as="textarea" rows="10" placeholder="Expand on Your Question Here" minLength="25" />
                    <Form.Control.Feedback className="feedback">The Description Looks Good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid" className="feedback">The Description Needs to be at least 25 Characters long!</Form.Control.Feedback>
                </Form.Group>
                <Button className="buttonSubmit" type="submit">Submit Question</Button>
            </Form>
        </>
    );
}


export default QuestionForm