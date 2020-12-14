//react
import React from 'react';
import {useEffect, useState} from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
//bootstrap
import { Container, Row, Col, Modal} from 'react-bootstrap';
//components
import NavBar from 'src/components/NavBar';
import SideBar from 'src/components/SideBar'
import Dashboard_SubjectCard from 'src/components/Dashboard/Dashboard_SubjectCard';
import Dashboard_ExpertCard from 'src/components/Dashboard/Dashboard_ExpertCard';
import Dashboard_HotCarousel from 'src/components/Dashboard/Dashboard_HotCarousel';
import Dashboard_BarChart from 'src/components/Dashboard/Dashboard_BarChart';
import {useDate} from 'src/components/Dashboard/Dashboard_Greeting';
import DashboardService from 'src/services/DashboardService';
import ExpertService from 'src/services/ExpertService';

export default function Dashboard() {
    const [ session, loading ] = useSession();
    // const router = useRouter();
    const { date, time, wish } = useDate();
    const [Subjects, setSubjects] = useState([]);
    const [ExpertApplications, setExpertApplications] = useState([]);
  //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function RemoveApplication(id){
      // console.log(id);
      let apps = ExpertApplications;
      const arr = apps.filter((item) => item.applicationId !== id);
      setExpertApplications(arr);
    };
    useEffect(() => {
      //Api call
      DashboardService.Get()
      .then((res) => {
        // console.log(res);
        setSubjects(res.data);
      })
      .catch((error) => {
        //  console.log(error);
      });
      //Api call applications
      ExpertService.GetApplications()
      .then((res) => {
        // console.log(res);
        setExpertApplications(res.data);
      })
      .catch((error) => {
          // console.log(error);
      });
    }, []);
  
    if (loading) return null
    // (
    //   <>
    //   <NavBar/>
    //   <Container fluid className="h-100">
    //   <Row className="h-100">
    //     {/* Sidebar col xl={2} md={3} */}
    //     <SideBar />
    //     </Row>
    //     </Container>
    //   </>
    // )
  
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
        {/*Dashboard Content */}
          <Col xl={9} md={9} className="mx-auto">
              {/* Greetings + time */}
              <Row className="mt-4">
                <Col md={6}><h3 className="WelcomingText">{wish} {session.user.name}</h3></Col>
                <Col md={2}></Col>
                <Col md={4}><h3 className="WelcomingText text-right">{date} {time}</h3></Col>
              </Row>
              {/* Push */}
              <Row className="mt-2 mb-4">
                </Row>
              {/* Subjects & Hot right now */}
              <Row className="mx-auto mb-4">
                <Col md={6} xs={12} className="mb-4 pr-auto">
                  {/* Title */}
                  <Row className="mb-2 mx-auto">
                    <Col>
                      <Row className="border-bottom border-secondary Box">
                        <Col md={8} className=""><h3 className="BoxTitle mb-1">Subjects</h3></Col>
                        <Col md={4} className=""><a className="BoxTitleLink DisabledEdit">see all</a></Col>
                      </Row>
                    </Col>
                  </Row>
                  {/* Content */}
                  <Row className="mx-auto">
                    {/* Subjects */}
                    {Subjects.map((s) => <Dashboard_SubjectCard key={s.id} SubjectName={s.subjectName} SubjectID={s.id} />)}
                                      
                  </Row>
                </Col>
                <Col md={6} xs={12} className="mb-4 pl-auto">
                  {/* Title */}
                  <Row className="mb-2 mx-auto">
                    <Col>
                      <Row className="border-bottom border-secondary Box">
                        <Col md={8} className=""><h3 className="BoxTitle mb-1">Hot right now</h3></Col>
                        <Col md={4} className=""><a className="BoxTitleLink" onClick={handleShow}>definition of hot</a></Col>
                      </Row>
                    </Col>
                  </Row>
                  {/* Content */}
                  <Row className="CarouselRow mx-auto">
                    {/* Hot carousel */}
                    <Dashboard_HotCarousel Subject1={Subjects[0]} Subject2={Subjects[1]} Subject3={Subjects[2]}/>
                  </Row>
                </Col>
              </Row>
              {/* Hot by data & Expert verify */}
              <Row className="mx-auto mb-4">
                <Col md={6} xs={12} className="mb-4 pr-auto">
                  {/* Title */}
                  <Row className="mb-2 mx-auto">
                    <Col>
                      <Row className="border-bottom border-secondary Box">
                        <Col md={8} className=""><h3 className="BoxTitle mb-1">Hot by data</h3></Col>
                        <Col md={4} className=""><a className="BoxTitleLink DisabledEdit">about this graph</a></Col>
                      </Row>
                    </Col>
                  </Row>
                  {/* Content */}
                  <Row className="mx-auto">
                    {/* Barchart of hot data */}
                    <Col className="mt-2 p-0"><Dashboard_BarChart /></Col>
                  </Row>
                </Col>

                <Col md={6} xs={12} className="mb-4 pl-auto">
                  {/* Title */}
                  <Row className="mb-2 mx-auto">
                    <Col>
                      <Row className="border-bottom border-secondary Box">
                        <Col md={9} className=""><h3 className="BoxTitle mb-1">Experts awaiting verification</h3></Col>
                        <Link href={"/expertverification"}><Col md={3} className=""><a className="BoxTitleLink">View all</a></Col></Link>
                      </Row>
                    </Col>
                  </Row>
                  {/* Content */}
                  <Row className="mx-auto">
                    {/* Experts to verify */}
                    {ExpertApplications.length > 0 ? ExpertApplications.map((ea) => <Dashboard_ExpertCard key={ea.applicationId} Username={ea.userName} Subject={ea.subjectName} data={ea} RemoveFunc={RemoveApplication}/>) : <h4>No applications at the moment.</h4>}
                  </Row>
                </Col>
              </Row>
          </Col>
      </Row>

      </Container>

      <Modal show={show} onHide={handleClose} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>Definition of hot</Modal.Title>
        </Modal.Header>
        <Modal.Body>Hot is defined by the amount of upvotes a post has; and how old it is. <br />
          If the post is just created but already has a lot of upvotes then it will be marked as hot. <br />
        The top 3 subjects shown here are based on how hot there questions are. This are the 3 subjects with the hottest questions at the moment.
        </Modal.Body>
      </Modal>
    </>
  )
  }
}
