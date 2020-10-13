import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Figure, Form, Button } from 'react-bootstrap';
import Question from "./QuestionHead";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function QuestionCreateAnwser() {
    const [Answer, setAnswer] = useState(
        {
            answercontent: '',
            datetimecreated: ''
        }
    );

    const handleSubmit = () => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        var realdate =
            year + '-' + month + '-' + date
            + 'T' + hours + ':' + min + ':' + sec;
         setAnswer({ ...Answer, datetimecreated: realdate });
    };

    const handleChange = (event) => {
        setAnswer({ ...Answer, [event.target.name]: event.target.value })
    };

    return (
        <div class="rounded container">
            <Form onSubmit={handleSubmit}>
                <Row className="justify-content-md-left">
                    <Col md="12">
                        <Form.Group className="textarea">
                            <Form.Label><h4>Enter Answer</h4></Form.Label>
                            <Form.Control as="textarea" rows="2" placeholder="Enter Answer" name="answercontent" value={Answer.answercontent} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md sm="1">
                        <div className="float-md-right"> <Button type="submit" variant="light">Answer Question</Button></div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
export default QuestionCreateAnwser;