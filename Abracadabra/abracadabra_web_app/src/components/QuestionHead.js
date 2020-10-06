import React from "react";
import { Container, Row, Col, Image, Figure, Button } from 'react-bootstrap';


function Question() {
    return (
        <div class="rounded container">
            <br />
            <Row className="justify-content-md-left">
                <Col md="1">
                    <b><h2>Q</h2></b>
                </Col>
                <Col md="9">
                    <u> <h4>How do you dice an onion?</h4></u>
                </Col>
                <Col md="1">
                    <Figure.Image
                        width={171}
                        height={180}
                        src="//placehold.it/150"
                    />
                </Col>
                <Col md="1">
                    <h6> Tyler Hanson</h6>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md sm="8">
                    <p className="wrap-text"><h8>I don't understand how you cut it, can someone help me?</h8> </p>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md sm="1">
                    <div className="float-md-right"> <Button variant="light">Ask A Question</Button></div>
                </Col>
            </Row>
            <hr></hr>
        </div>



    );
}
export default Question;