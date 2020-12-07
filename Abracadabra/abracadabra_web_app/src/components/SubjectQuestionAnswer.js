import { Card, Row, Col, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import {
  faChevronUp,
  faChevronDown,
  faFlag,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import ReportService from 'src/services/ReportService';

export default function Answer({ answer }) {
  const [voted, setVoted] = useState();
  const [vote, setVote] = useState({
    questionid: "",
    vote: "",
  });
  const handleClick = (amount) => {
    setVote({ ...comment, vote: amount });
  };

  //#region FlaggingQuestion
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastColor, setToastColor] = useState("");

  const HandleAnswerFlagClick = async () => {
    ReportService.FlagAnswer(answer.id)
    .then(res => {
      //console.log(res);
      setToastText("Answer successfully reported");
      setToastColor("bg-success");
      setShowToast(true);
    })
    .catch(err => {
      //console.log(err);
      try {
      if(err.response.status == 400)
      {
        setToastText(err.response.data);
        setToastColor("bg-warning");
      }
      else if(err.response.status == 401)
      {
        setToastText("You need to be logged in to report an answer!");
        setToastColor("bg-warning");
      }
      else 
      {
        setToastText("Oops! Something went wrong with the API, try again later.");
        setToastColor("bg-danger");
      }
      setShowToast(true);
    }
    catch {
      setToastText("Oops! couldn't reach the report API, try again later.");
      setToastColor("bg-danger");
      setShowToast(true);
    }
    });
  };
  //#endregion

  const handlePost = () => {
    VotesService.PostVoteAnswer(vote)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  function HumanDateTime(dateAndTime) {
    var date = new Date(dateAndTime + "Z");
    date = date.toUTCString().split(", ");
    date = date[1].slice(0, 17);

    return date;
  }
  return (
    <>
      <Row>
        <Col md={11} className="mx-auto">
          <Card className="answerBody">
            <Card.Body>
              <Row>
                <Col md={11}>
                  <Card.Text>{answer.answerContent}</Card.Text>
                </Col>
                <Col md={1} className="votingDiv">
                  <FontAwesomeIcon className="votingArrow" icon={faChevronUp} />
                  <p>100</p>
                  <FontAwesomeIcon
                    className="votingArrow"
                    icon={faChevronDown}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={11}></Col>
                <Col md={1} className="flagDiv">
                  <FontAwesomeIcon className="flagIcon WhiteLinks" icon={faFlag} onClick={HandleAnswerFlagClick} />
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="answerFooter">
              <div className="d-flex">
                <img
                  className="questionPageAvatar"
                  src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"
                ></img>
                <p className="answerUsername">
                  {answer.userName}
                  {answer.userRole === "Expert" ? (
                    <FontAwesomeIcon
                      className="checkIcon ml-2"
                      icon={faCheck}
                    />
                  ) : (
                    <></>
                  )}
                </p>
              </div>
              <p>Posted on: {HumanDateTime(answer.dateTimeCreated)}</p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
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
