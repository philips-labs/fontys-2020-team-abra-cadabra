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
import Report_CardAnswer from 'src/components/Report_CardAnswer';
import Report_CardQuestion from 'src/components/Report_CardQuestion';
//services
import ReportService from 'src/services/ReportService';

export default function Reports() {
  const [ session, loading ] = useSession();
  // const router = useRouter();
  const { date, time, wish } = useDate();
  const [QuestionReports, setQuestionReports] = useState([]);
  const [AnswerReports, setAnswerReports] = useState([]);

  function RemoveFlaggedAnswer(id){
    console.log(id);
    let answers = AnswerReports;
    const arr = answers.filter((item) => item.answerId !== id);
    setAnswerReports(arr);
  };

  function RemoveFlaggedQuestions(id){
    console.log(id);
    let answers = QuestionReports;
    const arr = answers.filter((item) => item.questionId !== id);
    setQuestionReports(arr);
  };

  useEffect(() => {
    //Api call questions
    ReportService.GetFlaggedQuestions()
    .then((res) => {
      console.log(res);
      setQuestionReports(res.data);
    })
    .catch((error) => {
       console.log(error);
    });
    //Api call answers
    ReportService.GetFlaggedAnswers()
    .then((res) => {
      console.log(res);
      setAnswerReports(res.data);
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
                    {QuestionReports.length > 0 ? QuestionReports.map((qr) => <Report_CardQuestion key={qr.questionId} ReportData={qr.question} Count={qr.count} type={"Question"} RemoveFunc={RemoveFlaggedQuestions}/>) : <h4>No reported anwers at the moment...</h4>}                
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
                   {AnswerReports.length > 0 ? AnswerReports.map((ar) => <Report_CardAnswer key={ar.answerId} ReportData={ar.answer} Count={ar.count} type={"Answer"} RemoveFunc={RemoveFlaggedAnswer}/>) : <h4>No reported anwers at the moment...</h4>}     
      
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
