//react
import React from 'react';
import {useEffect, useState} from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
//bootstrap
import { Container, Row, Col, Button, Modal, Form, Alert } from 'react-bootstrap';
//components
import NavBar from 'src/components/NavBar';
import SideBar from 'src/components/SideBar';
import {FaPlus, FaTimes} from 'react-icons/fa';
import {useDate} from 'src/components/Dashboard/Dashboard_Greeting';
import Dashboard_SubjectCard from "src/components/Dashboard/Dashboard_SubjectCard";
import SubjectService from "src/services/SubjectService";

export default function Subjectmanagement() {
  const [ session, loading ] = useSession();
  const { date, time, wish } = useDate();
  const [FoundSubjects,setFoundSubjects] = useState([]);
  const [SubjectModal, setSubjectModal] = useState(false);
  const [Name,setName] = useState("");

  const handleClose = () => setSubjectModal(false);
  const handleShow = () => setSubjectModal(true);

  function RemoveSubject(id){
    let apps = FoundSubjects;
    const arr = apps.filter((item) => item.id !== id);
    setFoundSubjects(arr);
  };

  useEffect(() => {
    //Api call
    SubjectService.GetAllSubjects()
    .then((res) => {
      console.log(res);
      setFoundSubjects(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const updateName = async(event) => {
    setName(event.target.value);
};

const enterSubmit = (event) => {
  // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
  if (event.key === 'Enter') {
    event.preventDefault();
    event.stopPropagation();
    addSubject();
  }
};

const addSubject = async() => {
  if (Name != null) {
      const data = {
          SubjectName: Name
      };
      await SubjectService.AddSubject(data).then(res => { setName(""); setShowSubjectAlert(false); handleClose(); setFoundSubjects(FoundSubjects => [...FoundSubjects, res.data]); })
        .catch(err => {
          //console.log(err.response);
          if(err.response?.status == 401)
          {
              setMsgSubjectError("Unauthorized, Logout and login again");
              setShowSubjectAlert(true);
          }
          else if (err.response?.status != 400) {
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

  if (loading) return null

  if (!loading && !session) signIn('Credentials')

  if (!loading && session) {
    localStorage.setItem("AdminToken", session.user.image);
return (
    <>
    <NavBar/>
    <Container fluid className="h-100">
    <Row className="h-100">
      {/* Sidebar col xl={2} md={3} */}
      <SideBar />
      {/*Verification Content */}
      <Col xl={9} md={9} className="mx-auto">
              {/* Greetings + time */}
              <Row className="mt-4">
                <Col md={6}><h3 className="WelcomingText"></h3></Col>
                <Col md={2}></Col>
                <Col md={4}><h3 className="WelcomingText text-right">{date} {time}</h3></Col>
              </Row>
              {/* Push */}
              <Row className="mt-2 mb-4">
                </Row>
                {/* Main content */}

                {/* Question reports */}
                <Row className="mx-auto mb-4">
                <Col md={12} xs={12} className="mb-4 pr-auto">
                  {/* Title */}
                  <Row className="mb-2 mx-auto">
                    <Col>
                      <Row className="border-bottom border-secondary Box">
                      <Col md={8} className=""><h3 className="BoxTitle mb-1">Manage subjects</h3></Col>
                      <Col md={4} className=""><a className="BoxTitleLink"><Button variant={"info"} size={"sm"} className="mb-1" onClick={handleShow}><FaPlus /> New subject </Button></a></Col>
                      </Row>
                    </Col>
                  </Row>
                  {/* List of subjects */}
                  <Row className="mx-auto">
                    {/* Map the subjects */}
                    
                    {FoundSubjects.length > 0 ? FoundSubjects.map((fs) => <Dashboard_SubjectCard key={fs.id} SubjectName={fs.subjectName} SubjectID={fs.id} RemoveFunc={RemoveSubject}/> ) : <h4>No subjects created yet</h4>}
                      
                  </Row>
                </Col>
              </Row>

          </Col>
      </Row>
      </Container>
        {/* Modal */}
      <Modal show={SubjectModal} onHide={handleClose}>
        <Container className="p-3">
                {/* Header */}
            <Row className="mb-2">
                <Col md={10} xs={10}><h5>Add subject</h5></Col>  
                <Col md={2} xs={2} className="justify-content-end d-flex"><FaTimes color="white" className="LogoButton" onClick={handleClose} /></Col>
            </Row>
            {/* Body */}
            <Row className="mb-4">
                <Col>
                    <Row className="mb-4">
                  <Col md={2} xs={2} className="my-auto"><h6 className="font-weight-bold mb-0">Name:</h6></Col>
                  <Col md={8} xs={8} className="my-auto pr-0">
                    <Form.Group className="my-auto">
                      <Form.Control size={"sm"} type="text" value={Name} onChange={updateName} placeholder={"Subject..."} required onKeyDown={enterSubmit}/>
                    </Form.Group>
                  </Col>
                </Row>
                <Row><Col><SubjectAlert /></Col></Row>
                </Col>
            </Row>
            {/* Footer */}
            <Row>
                <Col className="justify-content-end d-flex">
                    <Button variant="info" onClick={addSubject} className="mr-2">
                        <FaPlus className="my-auto" /> Add subject
                    </Button>
                </Col>
            </Row>
         </Container>
    </Modal>
    </>
  )
  }
}
