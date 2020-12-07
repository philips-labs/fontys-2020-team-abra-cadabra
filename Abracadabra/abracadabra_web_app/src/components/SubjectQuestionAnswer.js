import { Card, Row, Col, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, onClick, Link } from "react";
import {
  faChevronUp,
  faChevronDown,
  faFlag,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import VotesService from "../services/VotesService"
import QuestionService from "../services/QuestionService"
import AnswerService from "../services/AnswerService"
import ReportService from 'src/services/ReportService';



export default function Answer({ answer }) {
  const [date, setDate] = useState();
  const [error, setError] = useState();
  const [endorsed, setEndorsed] = useState(false)
  const [isloggedin, setIsLoggedIn] = useState(false);
  const [totalvotes, setTotalVotes] = useState(answer.upvotes - answer.downvotes)
  const [voted, setVoted] = useState(false)
  const [rendered, setRendered] = useState(false)
  const [vote, setVote] = useState({
    AnswerId: answer.id,
    vote: ""
  })
  
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


  const UpdateVotesAnswers = () => {
    AnswerService.GetAnswer(answer.id).then((res) => {
      console.log(res);
      console.log(res.data);
      setTotalVotes(res.data.upvotes - res.data.downvotes)
    })
      .catch((error) => {
        console.log(error.response.status)
      });
  }

  useEffect(() => {
    const tokenExist = localStorage.getItem("Token");
    if (tokenExist) {
      setIsLoggedIn(true);
      AnswerService.GetAnswerEndorsement().then((res) => {
      console.log(res);
      console.log(res.data);
      setEndorsed(true)
      })
      .catch((error) => {
        console.log(error.response.status)
      });
      VotesService.GetAnswerVote(answer.id).then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data.vote == 1 | -1) {
          setVote({ ...vote, vote: res.data.vote })
          setVoted(true)
        }
      })
        .catch((error) => {
          console.log(error.response.status)
        });
    }
  }, []);

  const firstClick = (amount) => {
    if (isloggedin == true) {
      setRendered(true)
      if (vote.vote == null) {
        setVote({ ...vote, vote: amount })
      }
      else {
        handleClick(amount)
      }
    }
    else {
      setError("Error, please log in before voting")
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
    VotesService.PostVoteAnswer(vote).then((res) => {
      console.log(res);
      console.log(res.data);
      setError(null)
      setVoted(true)
      UpdateVotesAnswers()
    })
      .catch((error) => {
        setError("Error submitting, please try again")
      });
  };

  const handleVoteDelete = () => {
    VotesService.DeleteVoteAnswer(answer.id).then((res) => {
      console.log(res);
      console.log(res.data);
      setError(null)
      UpdateVotesAnswers()
      setVoted(false)
      setRendered(false)
      setVote({ ...vote, vote: null })
    })
      .catch((error) => {
        setError("Error deleting, please try again")
      });
  };
  const handleVotePut = () => {
    VotesService.PutVoteAnswer(vote).then((res) => {
      console.log(res);
      console.log(res.data);
      setError(null)
      UpdateVotesAnswers()
    })
      .catch((error) => {
        setError("Error channging vote, please try again")
      });
  };
  const HandleEndorseClick = () => {
    if (endorsed == false) {
    AnswerService.PostAnswerEndorsement(answer.id).then((res) => {
      console.log(res);
      console.log(res.data);
      setEndorsed(true)
    })
    .catch((error) => {
      setError("Error posting endorsement, please try again")
    });
  }
  else {
    AnswerService.DeleteAnswerEndorsement(answer.id).then((res) => {
      console.log(res);
      console.log(res.data);
      setEndorsed(false)
    })
    .catch((error) => {
      setError("Error deleting endorsement, please try again")
    });
  }
  }
  const ShowUpvoted = () => {
    return (
      <div>
        {(() => {
          if (isloggedin == true) {
            if (vote.vote == 1) {
              return (
                <div ><FontAwesomeIcon className="votingArrowVoted" icon={faChevronUp} onClick={() => firstClick(1)} /></div>
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
  const ShowEndorse = () => {
    return (
      <div>
        {(() => {
           if (isloggedin == true) {
          if (endorsed == true) {
            return (
              <div><FontAwesomeIcon className="endorseIconSelected"  icon={faCheck} onClick={HandleEndorseClick} /></div>
            )
          } else {
            return (
              <div><FontAwesomeIcon className="endorseIcon"  icon={faCheck} onClick={HandleEndorseClick} /></div>
            )
          }
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
    if (answer.dateTimeCreated != undefined) {
      HumanDateTime(answer.dateTimeCreated);
    }
  }, [answer]);


  return (
    <>
      <Row>
        <Col md={11} className="mx-auto">
          <Card className="answerBody">
            <Card.Body>
              <Row>
                <Col md={11}>
                  {error &&
                    <h6 className="errorVoting"> {error} </h6>}
                  <Card.Text>{answer.answerContent}</Card.Text>
                </Col>
                <Col md={1} className="votingDiv">
                  <ShowUpvoted />
                  <p>{totalvotes}</p>
                  <ShowDownvoted />
                </Col>
              </Row>
              <Row>
                <Col md={11}></Col>
                <Col md={1} className="flagDiv">
                <FontAwesomeIcon className="flagIcon WhiteLinks" icon={faCheck} onClick={HandleAnswerFlagClick} />
                <FontAwesomeIcon className="endorseIcon WhiteLinks" icon={faFlag} onClick={HandleEndorseClick} />
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
              <p>Posted on: {date}</p>
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
