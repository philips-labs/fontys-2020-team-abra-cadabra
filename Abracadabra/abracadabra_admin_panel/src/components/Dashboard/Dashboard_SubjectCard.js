//react
import React from 'react';
import {useEffect, useState} from 'react';
import Link from 'next/link';
//bootstrap
import {Card, Image, Modal, Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import {FaEdit, FaBan, FaCheck, FaTrashAlt, FaTimes } from 'react-icons/fa';
import SubjectService from "src/services/SubjectService";
//import image
// import Logo from 'public/images/Abra_Logo_Centered.png';

export default function Dashboard_SubjectCard({SubjectName, SubjectID, RemoveFunc}) {
    const [SubjectModal, setSubjectModal] = useState(false);
    const [editing,setEditing] = useState(false);
    const [Name,setName] = useState("");
    const [oldName, setOldName] = useState("");

    const handleClose = () => setSubjectModal(false);
    const handleShow = () => setSubjectModal(true);

    const deleteSubject = async() => {
        SubjectService.RemoveSubject(SubjectID).then(res => {handleClose(); RemoveFunc(SubjectID);}).catch(err => {console.log(err)});   
    };
    const updateName = async(event) => {
        setName(event.target.value);
    };
    const editName = async() => {
        setEditing(true);
        setShowSubjectAlert(false);
    };
    const cancelNameEdit = async() => {
        setEditing(false);
        setName(oldName);
        setShowSubjectAlert(false);
    };
    const confirmNameEdit = async() => {
        if (Name != oldName) {
            const data = {
                ID: SubjectID,
                SubjectName: Name
            };
            await SubjectService.EditSubject(SubjectID, data).then(res => { setOldName(Name); setEditing(false); setShowSubjectAlert(false); })
              .catch(err => {
                console.log(err.response);
                if(err.response.status == 401)
                {
                    setMsgSubjectError("Unauthorized, Logout and login again");
                    setShowSubjectAlert(true);
                }
                else if (err.response.status != 400) {
                    setMsgSubjectError("Something went wrong calling the api");
                    setShowSubjectAlert(true);
                  }
                  else {
                    if(err?.response.data?.errors?.SubjectName[0] != null)
                    {
                    setMsgSubjectError(err?.response.data?.errors?.SubjectName[0]);
                    setShowSubjectAlert(true);
                    }
                    else {
                      setMsgSubjectError(err?.response?.data);
                      setShowSubjectAlert(true);
                    }
                  }
              });
          }
          else {
            setEditing(false);
          }
    };

    const [msgSubjectError, setMsgSubjectError] = useState("Error msg");
    const [showSubjectAlert, setShowSubjectAlert] = useState(false);
    function SubjectAlert() {
      if (showSubjectAlert) {
        return (
          <Alert className="" variant="danger" onClose={() => setShowSubjectAlert(false)} dismissible>
            <p className="my-auto">
              {msgSubjectError}
            </p>
          </Alert>
        );
      }
      return <> </>;
    };
    
    

    useEffect(() => {
        setName(SubjectName);
        setOldName(SubjectName);
      }, []);

    return (
        <>

            <Card bg="secondary" className="mb-2 w-100">
                <Card.Body className="pl-1 pr-1 p-0 d-flex">
                    <Image src={"/images/Abra_Logo_Centered.png"} height={35} className="my-auto" />
                    <h5 className="my-auto mr-auto BoxContentText">{Name}</h5>
                    <a className="my-auto BoxContentLink mr-2" onClick={handleShow}>View details</a>
                    {/* <a className="my-auto BoxContentLinkDisabled mr-2">View details</a> */}
                    {/* <Link href={"/subjectmanagement/" + SubjectID + "/edit"}><a className="my-auto disabled"><FaEdit /></a></Link> */}
                    {/* <a className="my-auto BoxContentLinkDisabled" disabled><FaEdit /></a> */}
                </Card.Body>
            </Card>
            {/* Modal */}
            <Modal show={SubjectModal} onHide={handleClose}>
                <Container className="p-3">
                        {/* Header */}
                    <Row className="mb-2">
                        <Col md={10} xs={10}><h5>Manage subject</h5></Col>  
                        <Col md={2} xs={2} className="justify-content-end d-flex"><FaTimes color="white" className="LogoButton" onClick={handleClose} /></Col>
                    </Row>
                    {/* Body */}
                    <Row className="mb-4">
                        <Col>
                            <Row className="mb-4">
                          <Col md={2} xs={2} className="my-auto"><h6 className="font-weight-bold mb-0">Name:</h6></Col>
                          <Col md={8} xs={8} className="my-auto pr-0">
                            <Form.Group className="my-auto">
                              <Form.Control size={"sm"} type="text" value={Name} onChange={updateName} placeholder={"Subject..."} disabled={!editing} required />
                            </Form.Group>
                          </Col>
                          <Col className="my-auto p-0 ml-2">
                            <a className="my-auto Clickable">{editing ? <FaCheck color={"green"} className="mr-1" onClick={confirmNameEdit} /> : <FaEdit onClick={editName} />}</a>{editing ? <a onClick={cancelNameEdit} className="my-auto Clickable"><FaBan color={"red"} /></a> : <></>}
                          </Col>
                        </Row>
                        <Row><Col><SubjectAlert /></Col></Row>
                        </Col>
                    </Row>
                    {/* Footer */}
                    <Row>
                        <Col className="justify-content-end d-flex">
                            <Button variant="danger" onClick={deleteSubject} className="mr-2">
                                <FaTrashAlt className="my-auto" /> Delete subject
                            </Button>
                        </Col>
                    </Row>
                </Container>
        </Modal>
        </>
    );
}