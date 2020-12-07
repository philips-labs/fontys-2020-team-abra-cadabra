//react
import React from 'react';
import {useEffect, useState} from 'react';
import Link from 'next/link';
//bootstrap
import {Card, Image, Modal, Button, Container, Row, Col } from 'react-bootstrap';
import {FaCheck, FaTimes } from 'react-icons/fa';
import ExpertService from 'src/services/ExpertService';

// Get Verification info with api call

export default function Dashboard_SubjectCard({Username, Subject, data, RemoveFunc}) {
    const [ExpertModal, setExpertModal] = useState(false);

    const handleClose = () => setExpertModal(false);
    const handleShow = () => setExpertModal(true);
    const acceptRequest = () => {
        ExpertService.AcceptApplication(data).then(res => {handleClose();}).catch(err => {});
        RemoveFunc(data.userId);
    };
    const denyRequest = () => {
        ExpertService.DenyApplication(data).then(res => {handleClose();}).catch(err => {});
        RemoveFunc(data.userId);
    };

    return (
        <>
            <Card bg="secondary" className="mb-2 w-100">
                <Card.Body className="p-1 d-flex">
                    <Image src="https://via.placeholder.com/150" height={35} className="my-auto mr-1" roundedCircle />
                    <h5 className="my-auto mr-auto BoxContentText">{Username} - {Subject}</h5>
                    <a onClick={handleShow} className="my-auto BoxContentLink mr-2">View request details</a>
                    <a onClick={acceptRequest} className="my-auto mr-1 accept"><FaCheck /></a>
                    <a onClick={denyRequest} className="my-auto mr-1 decline"><FaTimes /></a>
                </Card.Body>
            </Card>
                {/* Modal */}
                <Modal show={ExpertModal} onHide={handleClose}>
                <Container className="p-3">
                        {/* Header */}
                    <Row className="mb-2">
                        <Col md={10}><h5>Expert verification request details</h5></Col>  
                        <Col md={2} className="justify-content-end d-flex"><FaTimes color="white" className="LogoButton" onClick={handleClose} /></Col>
                    </Row>
                    {/* Body */}
                    <Row className="mb-4">
                        <Col>
                            <Row>
                                <Col><h6 className="font-weight-bold">Subject:</h6></Col>
                            </Row>
                            <Row>
                            <Col><p>{Subject}</p></Col>
                            </Row>
                            <Row>
                                <Col><h6 className="font-weight-bold">Reasoning:</h6></Col>
                            </Row>
                            <Row>
                                <Col><h6>Extra info</h6></Col>
                            </Row>
                        </Col>
                    </Row>
                    {/* Footer */}
                    <Row>
                        <Col className="justify-content-end d-flex">
                            <Button variant="danger" onClick={denyRequest} className="mr-2">
                                Deny request
                            </Button>
    
                            <Button variant="success" onClick={acceptRequest}>
                                Approve request
                            </Button>
                        </Col>
                    </Row>
                </Container>
        </Modal>
        </>
    );
}