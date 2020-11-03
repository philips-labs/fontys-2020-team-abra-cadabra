import {Container, Row, Col} from 'react-bootstrap';
import Navbar from "src/components/Navbar.js";
import DefaultErrorPage from 'next/error';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faArrowAltCircleUp, faArrowAltCircleDown, faAward, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import QuestionService from 'src/services/QuestionService';
import QuestionCreateAnswer from 'src/components/QuestionCreateAnswer';
 
function Question({data, subject}) {

        // get the subject from router, to pass to the navbar for navigation button and title
        // const router = useRouter()
        // const { subject, id } = router.query
        const [question, setQuestion] = useState({});
        const [answers, setAnswers] = useState([]);

        console.log(data);

        function reverseArray(array) {
            return array.reverse();
        }
    
        // const URL = 'https://localhost:44343/api/Questions/';
        // async function GetQuestion() {
        //     const response = await QuestionService.GetQuestion(id)
        //         .then(
        //             response => {
        //                 setQuestion(response.data);
        //                 setAnswers(reverseArray(response.data.answers));
        //             }
        //         ).catch(function (error) {
        //             console.error(error);
        //         })
        // }
    
        useEffect(() => {
            //GetQuestion();
            setQuestion(data);
            setAnswers(data.answerViewModels);
        }, [data.answerViewModels]);

        if(data === 404 || data == "failure" || data === 400)
        {
          return (
            <DefaultErrorPage statusCode={404} />
          );
        }

    return (
    <>
            <Navbar subjectTitle={subject}/>
            <div className="mx-auto questionHead">
            <div className="answerHead mx-auto">
                <h1>Q</h1>
                <Row>
                 <Col md={10} className="mx-auto">                 
                   <Row>
                     <Col md={9}>
                     <h3>{question.title}</h3>
                     </Col>
                     <Col md={3} className="d-flex justify-content-end">
                        <img className="questionAvatar" src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"></img>
                        <p className="questionUsername">{question.userName}</p>
                     </Col>
                  </Row>
                  <Row className="">
                          <Col>
                          <p>{question.description}</p>
                          </Col>
                   
                </Row>
                 </Col>
                </Row>
                </div>
                <div className="row justify-content-end">
                    <button className="questionButton">Submit Own Answer</button>
                </div>
            </div>

            <div className="answerHead mx-auto">
                <h1>A</h1>
                {/* Create component for answer tnx */}
                {answers.map(answer => (
                    <Row key={answer.id} className="border-bottom mb-3">
                        <Col md={10} className="mx-auto">
                                {/* Answer header */}
                                <Row>
                                <Col md={1}>
                                <img className="questionAvatar" src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"></img>
                                </Col>
                            <Col md={7}>
                                <h6 className="font-weight-bold">{answer.userName}</h6>

                            </Col>
                            <Col md={4}>
                            <h6 className="font-weight-bold helpedText">Has Helped: <span>100</span> People</h6>
                            </Col>
                            </Row>
                            {/* Answer content */}
                            <Row>
                                <Col md={1}></Col>
                                <Col>
                                        <p className="answerContentText">{answer.answerContent}</p>
                                </Col>
                            </Row>   
                        </Col>                  
                    </Row>                         
                ))}
                <QuestionCreateAnswer QID={question.id} />
            </div>
    </>
    );
  }
  
  export default Question

  export async function getServerSideProps({ params }) {
        // Fetch necessary data for the blog post using params.id
        let apiRes = null;
        try {
          apiRes = await QuestionService.GetQuestion(params.id), {timeout: 5000};
        } catch (err) {
          //apiRes = err;
          apiRes = err.response?.status; 
        }

        const subject = params?.subject;
    
        if(apiRes?.data?.title != null) {

                const data = apiRes.data;
          
                return {
                        props: {
                          data,
                          subject,
                        }
                      }
            }
            else if(apiRes === 404 || apiRes === 400)
            {
              const data = apiRes;
          
              return {
                props: {
                  data,
                  subject,
                }
              }
            }
            else {
          
              const data = "failure";
          
              return {
                props: {
                  data,
                  subject,
                }
              }
            }
}

