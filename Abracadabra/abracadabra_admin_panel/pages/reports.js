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
import Report_Card from 'src/components/Report_Card';

export default function Reports() {
  const [ session, loading ] = useSession();
  // const router = useRouter();
  const { date, time, wish } = useDate();
  const [Subjects, setSubjects] = useState([]);

  if (loading) return null

  if (!loading && !session) signIn('Credentials')

  if (!loading && session) {
return (
    <>
    <NavBar/>
    <Container fluid className="h-100">
    <Row className="h-100">
      {/* Sidebar col xl={2} md={3} */}
      <SideBar />
        {/*Report Content */}
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
                        <Col md={8} className=""><h3 className="BoxTitle mb-1">Reported Questions</h3></Col>
                      </Row>
                    </Col>
                  </Row>
                  {/* List of reports */}
                  <Row className="mx-auto">
                    {/* Reports */}
                    {/* Map the reports */}
                    <Report_Card ReportText={"This question is inappropiate and was reported?"} ReportID={1} type={"Question"}/>  
                    <Report_Card ReportText={"This question is inappropiate and was reported?"} ReportID={1} type={"Question"}/>  
                    <Report_Card ReportText={"This question is inappropiate and was reported?"} ReportID={1} type={"Question"}/>  
                    <Report_Card ReportText={"This question is inappropiate and was reported?"} ReportID={1} type={"Question"}/>  
                    <Report_Card ReportText={"This question is inappropiate and was reported?"} ReportID={1} type={"Question"}/>  
                    <Report_Card ReportText={"This question is inappropiate and was reported?"} ReportID={1} type={"Question"}/>  
                  </Row>
                </Col>
              </Row>

              {/* Answer Reports */}
              <Row className="mx-auto mb-4">
                <Col md={12} xs={12} className="mb-4 pr-auto">
                  {/* Title */}
                  <Row className="mb-2 mx-auto">
                    <Col>
                      <Row className="border-bottom border-secondary Box">
                        <Col md={8} className=""><h3 className="BoxTitle mb-1">Reported Answers</h3></Col>
                      </Row>
                    </Col>
                  </Row>
                  {/* List of reports */}
                  <Row className="mx-auto">
                    {/* Reports */}
                   {/* Map the reports */}
                   <Report_Card ReportText={"This answer needs reporting and the text should probably be cut off after a certain amount of characters"} ReportID={1} type={"Answer"}/>    
                   <Report_Card ReportText={"This answer needs reporting and the text should probably be cut off after a certain amount of characters"} ReportID={1} type={"Answer"}/>
                   <Report_Card ReportText={"This answer needs reporting and the text should probably be cut off after a certain amount of characters"} ReportID={1} type={"Answer"}/>
                   <Report_Card ReportText={"This answer needs reporting and the text should probably be cut off after a certain amount of characters"} ReportID={1} type={"Answer"}/>
                   <Report_Card ReportText={"This answer needs reporting and the text should probably be cut off after a certain amount of characters"} ReportID={1} type={"Answer"}/>
                   <Report_Card ReportText={"This answer needs reporting and the text should probably be cut off after a certain amount of characters"} ReportID={1} type={"Answer"}/>        
      
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
