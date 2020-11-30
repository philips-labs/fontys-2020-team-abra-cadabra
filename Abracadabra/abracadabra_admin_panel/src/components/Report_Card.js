//react
import React from 'react';
import {useEffect, useState} from 'react';
import Link from 'next/link';
//bootstrap
import {Card, Image, Modal, Button, Container, Row, Col } from 'react-bootstrap';
import {FaEdit, FaFlag, FaTimes } from 'react-icons/fa'
//import image
// import Logo from 'public/images/Abra_Logo_Centered.png';

export default function Report_Card({ReportText, ReportID, type}) {
    const [showModal, setShowModal] = useState(false);
    const timesReported = 0;
    const ReportDesc = "";

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>

            <Card bg="secondary" className="mb-2 w-100">
                <Card.Body className="pl-1 pr-1 p-2 d-flex">
                    <FaFlag height={35} className="my-auto mr-2" color={"red"} />
                    <h5 className="my-auto mr-auto BoxContentText">{ReportText}</h5>
                    {/* Open modal */}
                    <a className="my-auto BoxContentLink mr-2" onClick={handleShow}>View report details</a>
                </Card.Body>
            </Card>
            {/* Modal */}
            <Modal show={showModal} onHide={handleClose}>
                    <Container className="p-3">
                         {/* Header */}
                        <Row className="mb-2">
                            <Col><h4>Report details</h4></Col>  
                            <Col className="justify-content-end d-flex"><FaTimes color="white" className="LogoButton" onClick={handleClose} /></Col>
                        </Row>
                        {/* Body */}
                        <Row className="mb-4">
                            <Col>
                                <Row>
                                    <Col><h6 className="font-weight-bold">Reported {type}:</h6></Col>
                                </Row>
                                <Row>
                                    <Col><p>{ReportText}</p></Col>
                                </Row>
                                <Row>
                                    <Col><p>{ReportDesc}</p></Col>
                                </Row>
                                <Row>
                                    <Col><h6><b>Amount of times reported:</b> {timesReported}</h6></Col>
                                </Row>
                            </Col>
                        </Row>
                        {/* Footer */}
                        <Row>
                            <Col className="justify-content-end d-flex">
                                <Button variant="info" onClick={handleClose} className="mr-2">
                                   Don't take action
                                </Button>
      
                                <Button variant="danger" onClick={handleClose}>
                                    Delete post
                                </Button>
                            </Col>
                        </Row>
                    </Container>
            </Modal>
        </>
        
    );
}