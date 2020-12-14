//react
import React from 'react';
import {useEffect, useState} from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
//bootstrap
import { Container, Row, Col } from 'react-bootstrap';
//components
import NavBar from 'src/components/NavBar';
import SideBar from 'src/components/SideBar';
import {} from 'react-icons/fa';
import {useDate} from 'src/components/Dashboard/Dashboard_Greeting';
import Dashboard_ExpertCard from 'src/components/Dashboard/Dashboard_ExpertCard';
import ExpertService from 'src/services/ExpertService';

export default function Expertverification() {
  const [ session, loading ] = useSession();
  // const router = useRouter();
  const { date, time, wish } = useDate();
  const [ExpertApplications, setExpertApplications] = useState([]);

  function RemoveApplication(id){
    console.log(id);
    let apps = ExpertApplications;
    const arr = apps.filter((item) => item.applicationId !== id);
    setExpertApplications(arr);
  };

  useEffect(() => {
    //Api call applications
    ExpertService.GetApplications()
    .then((res) => {
      console.log(res);
      setExpertApplications(res.data);
    })
    .catch((error) => {
       console.log(error);
    });
  }, []);

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
                        <Col md={8} className=""><h3 className="BoxTitle mb-1">Users awaiting expert verification</h3></Col>
                      </Row>
                    </Col>
                  </Row>
                  {/* List of users awaiting verification */}
                  <Row className="mx-auto">
                    {/* Possible experts */}
                    {/* Map the users waiting for verification */} 
                      {ExpertApplications.length > 0 ? ExpertApplications.map((ea) => <Dashboard_ExpertCard key={ea.applicationId} Username={ea.userName} Subject={ea.subjectName} data={ea} RemoveFunc={RemoveApplication}/>) : <h4>No applications at the moment.</h4>}
                  </Row>
                </Col>
              </Row>

          </Col>
      </Row>
      </Container>
    </>
  )
  }
}
