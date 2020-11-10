import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import Navbar from "../src/components/Navbar";
import { Form, Button } from 'react-bootstrap';
import QuestionService from '../src/services/QuestionService';
import axios from 'axios';

function QuestionForm() {
            // get the subject from router, to pass to the navbar for navigation button and title
        const router = useRouter();
        const { subject, id } = router.query;

    const [validated, setValidated] = useState(false);
    const initialInputState = { title: "", description: "", subjectslug: "cooking"};
    const [question, setQuestion] = useState(initialInputState);
    const { title, description } = question;
    const [questions, setQuestions] = useState([]);

    function reverseArray(array) {
        return array.reverse();
    }

    const handleInputChange = e => {
        setQuestion({ ...question, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            console.log(question);
            QuestionService.Question(question);
            const goToQuestion = question.id + 1;
            console.log(goToQuestion);
            Router.push(subject + '/question/' + goToQuestion);
        }

        setValidated(true);
    };

    return (
        <>
            <Navbar />
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="questionForm mx-auto">
                <h1>Submit Your Question</h1>
                <Form.Group>
                    <Form.Label className="label">Question:</Form.Label>
                    <Form.Control required className="question" type="text" name="title" onChange={handleInputChange} placeholder="Type Your Question Here" />
                    <Form.Control.Feedback className="feedback">Question Looks Good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid" className="feedback">Question is Empty!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="label">Description:</Form.Label>
                    <Form.Control required as="textarea" rows="10" name="description" onChange={handleInputChange} placeholder="Expand on Your Question Here" minLength="25" />
                    <Form.Control.Feedback className="feedback">The Description Looks Good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid" className="feedback">The Description Needs to be at least 25 Characters long!</Form.Control.Feedback>
                </Form.Group>
                <Button className="buttonSubmit" type="submit">Submit Question</Button>
            </Form>
        </>
    );
}


export default QuestionForm