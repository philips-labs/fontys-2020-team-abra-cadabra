//react
import React from 'react';
import {useEffect, useState} from 'react';
import Link from 'next/link';
//bootstrap
import {Card, Image, Modal, Button, Container, Row, Col } from 'react-bootstrap';
import {FaEdit, FaFlag, FaTimes } from 'react-icons/fa'
//import image
// import Logo from 'public/images/Abra_Logo_Centered.png';
//services
import ReportService from 'src/services/ReportService';

export default function Report_CardQuestion({ReportData, Count, type, RemoveFunc}) {
    const [showModal, setShowModal] = useState(false);
    const ReportDesc = "";

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const unflagQuestion = (e) => {
        e.preventDefault();
        ReportService.UnFlagQuestion(ReportData.id)
        .then(res => {
            console.log(res);
            handleClose();
            RemoveFunc(ReportData.id);
        })
        .catch(err => {
            console.log(err);
        });
    };
    const deleteQuestion = (e) => {
        e.preventDefault();
        ReportService.DeleteFlaggedQuestion(ReportData.id)
        .then(res => {
            console.log(res);
            unflagQuestion(e);
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <>

            <Card bg="secondary" className="mb-2 w-100">
                <Card.Body className="pl-1 pr-1 p-2 d-flex">
                    <FaFlag height={35} className="my-auto mr-2" color={"red"} />
                    <h5 className="my-auto mr-auto BoxContentText">{ReportData?.title}</h5>
                    {/* Open modal */}
                    <a className="my-auto BoxContentLink mr-2" onClick={handleShow}>View report details</a>
                </Card.Body>
            </Card>
            {/* Modal */}
            <Modal show={showModal} onHide={handleClose} size={"lg"}>
                    <Container className="p-3">
                         {/* Header */}
                        <Row className="mb-2">
                            <Col md={10}><h4>{type} Report details</h4></Col>  
                            <Col md={2} className="justify-content-end d-flex"><FaTimes color="white" className="LogoButton" onClick={handleClose} /></Col>
                        </Row>
                        {/* Body */}
                        <Row className="mb-4">
                            <Col>
                                <Row>
                                    <Col><p className="mb-1"><b>{ReportData?.title}</b></p></Col>
                                </Row>
                                <Row>
                                    <Col><p className="BodyText">{ReportData?.description}</p></Col>
                                </Row>
                                <Row>
                                    
                                </Row>
                            </Col>
                        </Row>
                        {/* Footer */}
                        <Row>
                            <Col className="my-auto"><h6><b>Amount of times reported:</b> {Count}</h6></Col>
                            <Col className="justify-content-end d-flex p-auto">
                                <Button variant="warning" onClick={unflagQuestion} className="mr-2">
                                   Unflag post
                                </Button>
      
                                <Button variant="danger" onClick={deleteQuestion}>
                                    Delete post
                                </Button>
                            </Col>
                        </Row>
                    </Container>
            </Modal>
        </>
        
    );
}