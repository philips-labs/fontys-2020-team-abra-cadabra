import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from 'react-bootstrap';
import QuestionService from "../services/QuestionService";



function QuestionCreateAnwser( questionSendId ) {
    const [Answer, setAnswer] = useState(
        {
            answercontent: '',
            questionid: questionSendId.QID
        }
    );

    useEffect(() => {
        setAnswer({answercontent: '', questionid: questionSendId.QID})
    }, [questionSendId])

    const handleSubmit = (event) => {
        event.preventDefault();
        QuestionService.QuestionAnswer(Answer).then((res) => {
            console.log(res);
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error.response.data);
        });
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