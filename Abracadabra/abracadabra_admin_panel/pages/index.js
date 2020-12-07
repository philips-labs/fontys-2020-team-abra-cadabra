//react
import React from 'react';
import {useEffect, useState} from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
//bootstrap
import { Container, Row, Col, Carousel} from 'react-bootstrap';
//components
import NavBar from 'src/components/NavBar';
import SideBar from 'src/components/SideBar'
import Dashboard_SubjectCard from 'src/components/Dashboard/Dashboard_SubjectCard';
import Dashboard_ExpertCard from 'src/components/Dashboard/Dashboard_ExpertCard';
import Dashboard_HotCarousel from 'src/components/Dashboard/Dashboard_HotCarousel';
import Dashboard_BarChart from 'src/components/Dashboard/Dashboard_BarChart';
import {useDate} from 'src/components/Dashboard/Dashboard_Greeting';
import DashboardService from 'src/services/DashboardService';

export default function Dashboard() {
    const [ session, loading ] = useSession();
    // const router = useRouter();
    const { date, time, wish } = useDate();
    const [Subjects, setSubjects] = useState([]);
    const Subject = {Name: "Cooking"};

    useEffect(() => {
      //Api call
      DashboardService.Get()
      .then((res) => {
        console.log(res);
        setSubjects(res.data);
      })
      .catch((error) => {
         console.log(error);
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
      localStorage.setItem("Token", session.user.image);
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
                        <Col md={4} className=""><a className="BoxTitleLink">see all</a></Col>
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
                        <Col md={4} className=""><a className="BoxTitleLink">definition of hot</a></Col>
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
                        <Col md={4} className=""><a className="BoxTitleLink">about this graph</a></Col>
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
                        <Col md={3} className=""><a className="BoxTitleLink">View all</a></Col>
                      </Row>
                    </Col>
                  </Row>
                  {/* Content */}
                  <Row className="mx-auto">
                    {/* Experts to verify */}
                    <Dashboard_ExpertCard Username={"Verylonglongusername"} Subject={Subject}/>
                    <Dashboard_ExpertCard Username={"Verylonglongusername"} Subject={Subject}/>
                    <Dashboard_ExpertCard Username={"Verylonglongusername"} Subject={Subject}/>
                    <Dashboard_ExpertCard Username={"Verylonglongusername"} Subject={Subject}/>
                    <Dashboard_ExpertCard Username={"Verylonglongusername"} Subject={Subject}/>
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
