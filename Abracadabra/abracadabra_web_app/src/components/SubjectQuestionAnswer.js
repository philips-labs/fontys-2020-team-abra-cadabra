import { Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import {
  faChevronUp,
  faChevronDown,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

export default function Answer({ answer }) {
  const [voted, setVoted] = useState()
  const [vote, setVote] = useState({
    questionid: "",
    vote: ""
  })
  const handleClick = (amount) => {
    setVote({ ...comment, vote: amount })
  }
  
  
  const handlePost = () => {
      VotesService.PostVoteAnswer(vote).then((res) => {
          console.log(res);
          console.log(res.data);
      })
          .catch((error) => {
              console.log(error.response.data);
          });
  };
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
                  <FontAwesomeIcon className="flagIcon" icon={faFlag} />
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="answerFooter">
              <div className="d-flex">
                <img
                  className="questionPageAvatar"
                  src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"
                ></img>
                <p className="answerUsername">{answer.userName}</p>
              </div>
              <p>Posted on: {answer.dateTimeCreated}</p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}
