import { Container, Row, Col, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  faChevronUp,
  faChevronDown,
  faFlag,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
//Services
import ReportService from 'src/services/ReportService';

export default function Question({ question }) {
  const [date, setDate] = useState();

  function HumanDateTime(dates) {
    var date = new Date(dates + "Z");
    date = date.toUTCString().split(", ");
    date = date[1].slice(0, 17);
    setDate(date);
  }


    //#region FlaggingQuestion
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState("");
    const [toastColor, setToastColor] = useState("");
  
    const HandleQuestionFlagClick = async () => {
      ReportService.FlagQuestion(question.id)
      .then(res => {
        setToastText("Question successfully reported");
        setToastColor("bg-success");
        setShowToast(true);
      })
      .catch(err => {
        try {
        setShowToast(true);
        let text = err.response.status == 400 ? err.response.data : err.response.status == 401 ? "You need to be logged in to report a question!" : "Oops! couldn't reach the report API, try again later."; 
        if(err.response.status != 400 && err.response.status != 401)
        {
          setToastColor("bg-danger");
        }
        else 
        {
          setToastColor("bg-warning");
        }
        setToastText(text);  
      }
      catch {
        setToastText("Oops! couldn't reach the report API, try again later.");
        setToastColor("bg-danger");
        setShowToast(true);
      }
      });
    };
    //#endregion

  useEffect(() => {
    if (question.dateTimeCreated != undefined) {
      HumanDateTime(question.dateTimeCreated);
    }
  }, [question]);

  return (
    <>
      <div className="questionHead mx-auto">
        <div className="questionHeadDiv">
          <h1>Q</h1>
          <FontAwesomeIcon className="flagIcon WhiteLinks" icon={faFlag} onClick={HandleQuestionFlagClick} />
        </div>
        <Row>
          <Col md={11} className="mx-auto">
            <Row>
              <Col md={9}>
                <h3>{question.title}</h3>
              </Col>
              <Col md={3} className="d-flex justify-content-end">
                <img
                  className="questionPageAvatar"
                  src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"
                ></img>
                <p className="answerUsername">
                  {question.userName}
                  {question.userRole === "Expert" ? (
                    <FontAwesomeIcon
                      className="checkIcon ml-2"
                      icon={faCheck}
                    />
                  ) : (
                    <></>
                  )}
                </p>
              </Col>
            </Row>
            <Row className="ml-1">
              <Col md={9}>
                <p>{question.description}</p>
              </Col>
              <Col md={3} className="text-right">
                <p>Posted on: {date}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide className="bg-dark" style={{
      position: 'fixed',
      top: 10,
      right: 10,
    }}>
          <Toast.Header className={toastColor + " text-white"}>
            <strong className="mr-auto">Report</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{toastText}</Toast.Body>
        </Toast>
    </>
  );
}
