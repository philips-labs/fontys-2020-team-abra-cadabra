import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import moment from "moment";
import VotesService from "../services/VotesService"
import QuestionService from "../services/QuestionService"
import {
  faChevronUp,
  faChevronDown,
  faFlag,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function Question({ question }) {
  const [error, setError] = useState();
  const [date, setDate] = useState();
  const [isloggedin, setIsLoggedIn] = useState(false);
  const [totalvotes, setTotalVotes] = useState(question.upvotes - question.downvotes)
  const [voted, setVoted] = useState(false)
  const [rendered, setRendered] = useState(false)

  const [vote, setVote] = useState({
    QuestionId: "",
    vote: ""
  })



  const UpdateVotesQuestion = () => {
    QuestionService.GetQuestion(question.id).then((res) => {
      console.log(res);
      console.log(res.data);
      setTotalVotes(res.data.upvotes - res.data.downvotes)
    })
      .catch((error) => {
        console.log(error.response.status)
      });
  }

  useEffect(() => {
    setTotalVotes(question.upvotes - question.downvotes)
    setVote({ ...vote, QuestionId: question.id })
    const tokenExist = localStorage.getItem("Token");
    if (tokenExist) {
      setIsLoggedIn(true);

      VotesService.GetQuestionVote(question.id).then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data.vote == 1 | -1) {
          setVote({ ...vote, vote: res.data.vote })
          setVoted(true)
        }
      })
        .catch((error) => {
          console.log(error.response)
        });


    }
  }, [question.id]);
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
    if (rendered == true) {
      if (voted == false) {
        submitPost()
      }
      else {
        handleVotePut()
      }
    }
  }, [vote.vote]);

  const submitPost = () => {
    VotesService.PostVoteQuestion(vote).then((res) => {
      console.log(res);
      console.log(res.data);
      setError(null)
      setVoted(true)
      UpdateVotesQuestion()
    })
      .catch((error) => {
        setError("Error submitting, please try again")
      });
  };

  const handleVoteDelete = () => {
    VotesService.DeleteVoteQuestion(question.id).then((res) => {
      console.log(res);
      console.log(res.data);
      setError(null)
      setVoted(false)
      setRendered(false)
      setVote({ ...vote, vote: null })
      UpdateVotesQuestion()
    })
      .catch((error) => {
        setError("Error deleting, please try again")
      });
  };
  const handleVotePut = () => {
    VotesService.PutVoteQuestion(vote).then((res) => {
      console.log(res);
      console.log(res.data);
      setError(null)
      UpdateVotesQuestion()
    })
      .catch((error) => {
        setError("Error channging vote, please try again")
      });
  };

  const ShowUpvoted = () => {
    return (
      <div>
        {(() => {
            if (isloggedin == true) {
          if (vote.vote == 1) {
            return (
              <div><FontAwesomeIcon className="votingArrowVoted" icon={faChevronUp} onClick={() => firstClick(1)} /></div>
            )
          } else {
            return (
              <div><FontAwesomeIcon className="votingArrow" icon={faChevronUp} onClick={() => firstClick(1)} /></div>
            )
          }
        }
        else {
          return (
            <a href="/loginpage"><div href="/registerpage"><FontAwesomeIcon className="votingArrowDisabled" icon={faChevronUp}  /></div></a>
          )
        }
        })()}
      </div>
    )
  }
  const ShowDownvoted = () => {
    return (
      <div>
        {(() => {
            if (isloggedin == true) {
          if (vote.vote == -1) {
            return (
              <div><FontAwesomeIcon className="votingArrowVoted" icon={faChevronDown} onClick={() => firstClick(-1)} /></div>
            )
          } else {
            return (
              <div><FontAwesomeIcon className="votingArrow" icon={faChevronDown} onClick={() => firstClick(-1)} /></div>
            )
          }
        }
        else {
          return (
            <a href="/loginpage"><div><FontAwesomeIcon className="votingArrowDisabled" icon={faChevronDown} /></div></a>
          )
        }
        })()}
      </div>
    )
  }

  function HumanDateTime(dates) {
    var date = new Date(dates + "Z");
    date = date.toUTCString().split(", ");
    date = date[1].slice(0, 17);
    setDate(date);
  }

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
          <FontAwesomeIcon className="flagIcon" icon={faFlag} />
        </div>
        <Row>
          <Col md={11} className="mx-auto">
          {error &&
              <h6 className="errorVoting"> {error} </h6>}
            <Row>
              <Col md={9}>
                <h3>{question.title}</h3>
              </Col>
              <Col md={2} className="d-flex justify-content-end">
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
              <Col md={1} className="votingDiv">
                <ShowUpvoted />
                <p>{totalvotes}</p>
                <ShowDownvoted />
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
    </>
  );
}
