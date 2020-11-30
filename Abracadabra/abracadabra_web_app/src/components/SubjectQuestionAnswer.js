import { Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, onClick } from "react";
import {
  faChevronUp,
  faChevronDown,
  faFlag,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import VotesService from "../services/VotesService"

export default function Answer({ answer }) {
  const [totalvotes, setTotalVotes] = useState(answer.upvotes + answer.downvotes)
  const [voted, setVoted] = useState(false)
  const [rendered, setRendered] = useState(false)
  const [vote, setVote] = useState({
    AnswerId: answer.id,
    vote: ""
  })
  useEffect(() => {
    if (answer.vote != null)
    {
      setVoted(true)
    }
    
  }, []);


  const firstClick = (amount) => {
    setRendered(true)
    if (vote.vote == null) {
      setVote({ ...vote, vote: amount })
    }
    else {
      handleClick(amount)
    }
  }
  const handleClick = (amount) => {
    if (vote.vote == amount) {
      handleVoteDelete()
    }
    else {
      setVote({ ...vote, vote: amount })
    }
  }


  useEffect(() => {
    if (rendered == true){
    if (voted == false){
    submitPost()
    }
    else {
      handleVotePut()
    }
  }
  }, [vote.vote]);

  const submitPost = () => {
    VotesService.PostVoteAnswer(vote).then((res) => {
      console.log(res);
      console.log(res.data);
    })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleVoteDelete = () => {
    VotesService.DeleteVoteAnswer(vote).then((res) => {
      console.log(res);
      console.log(res.data);
    })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleVotePut = () => {
    VotesService.PutVoteAnswer(vote).then((res) => {
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
                  <FontAwesomeIcon className="votingArrow" icon={faChevronUp} onClick={() => firstClick(1)} />
                  <p>{totalvotes}</p>
                  <FontAwesomeIcon
                    className="votingArrow"
                    icon={faChevronDown}
                    onClick={() => firstClick(-1)}
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
              <p>Posted on: {answer.dateTimeCreated}</p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}
