import React from "react";
import { Container, Row, Col, Image, Figure, Form, Button } from 'react-bootstrap';
import Question from "./QuestionHead";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function QuestionCreateAnwser() {
    return (
        <div class="rounded container">
            <Row className="justify-content-md-left">
                <Col md="12">
                    <Form.Group className="textarea">
                        <Form.Label><h4>Enter Answer</h4></Form.Label>
                        <Form.Control as="textarea" rows="2" placeholder="Enter Answer" name="title" /*value="" onChange=""*/ />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md sm="1">
                    <div className="float-md-right"> <Button variant="light">Answer Question</Button></div>
                </Col>
            </Row>
        </div>
    );
}
export default QuestionCreateAnwser;