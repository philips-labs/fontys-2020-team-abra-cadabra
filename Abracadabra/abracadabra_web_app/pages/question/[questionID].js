import React, { useState, useEffect } from 'react';
import Navbar from "../../src/components/Navbar";
import QuestionCreateAnswer from "../../src/components/QuestionCreateAnswer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faArrowAltCircleUp, faArrowAltCircleDown, faAward, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function QuestionPage() {
    const [route, setRoute] = useState(null);
    const [question, setQuestion] = useState({});
    const [answers, setAnswers] = useState([]);

    function reverseArray(array) {
        return array.reverse();
    }

    useEffect(() => {
        setRoute(window.location.pathname.split("/")[2]);
    }, [])
    useEffect(() => {
        if (route != null) {
             GetQuestion(route);
        }
    }, [route])

    const URL = 'https://localhost:44343/api/Questions/';
    async function GetQuestion() {
        console.log(route);
        const response = await axios.get(URL + route)
            .then(
                response => {
                    setQuestion(response.data);
                 setAnswers(reverseArray(response.data.answers));
                }
            )
            .catch(function (error) {
                console.error(error);
            })
    }

    return (
        <>
            <Navbar />
            <div className="mx-auto questionHead">
                <div className="row">
                    <h1 className="col-md-8 questionTitle">{question.title}</h1>
                    <div className="col-md-4 d-flex justify-content-end">
                        <img className="questionAvatar" src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"></img>
                        <p className="questionUsername">{question.id}</p>
                    </div>
                </div>
                <div className="row questionContent">
                    <p>{question.description}</p>
                </div>
                <div className="row justify-content-end">
                    <button className="questionButton">Submit Own Answer</button>
                </div>
            </div>

            <div className="answerHead mx-auto">
                <h1>A</h1>
                {answers.map(answer => (
                    <div key={answer.id} className="row asnwerDiv">
                        <div className="col-11 row">
                            <div className="col-xl-1">
                                <img className="questionAvatar" src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"></img>
                            </div>
                            <div className="col-xl-10 d-flex ml-1">
                                <p className="answerUsername"><span className="expert">{answer.userID}</span></p>
                                <FontAwesomeIcon className="checkmark" icon={faCheckSquare} />
                                <p className="answerTagExpert">Has Helped: <span>100</span> People</p>
                            </div>
                            <div className="col-xl-9 d-flex answerContent">
                                <p>{answer.answerContent}</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row">
                                <div className="d-flex">
                                    <FontAwesomeIcon className="arrows" icon={faArrowAltCircleUp} />
                                    <h4>100</h4>
                                </div>
                                <div className="d-flex">
                                    <FontAwesomeIcon className="arrows" icon={faArrowAltCircleDown} />
                                    <h4>50</h4>
                                </div>
                            </div>
                            <div className="row editIcons">
                                <div className="d-flex align-self-bottom">
                                    <FontAwesomeIcon className="icon" icon={faAward} />
                                    <FontAwesomeIcon className="icon" icon={faPencilAlt} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <QuestionCreateAnswer QID={question.id} />
        </>
    )
}

export default QuestionPage