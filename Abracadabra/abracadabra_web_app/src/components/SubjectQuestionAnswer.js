import { Card, Row, Col, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, onClick, Link } from "react";
import {
  faChevronUp,
  faChevronDown,
  faFlag,
  faUserGraduate,
  faCheck
} from "@fortawesome/free-solid-svg-icons";

import VotesService from "../services/VotesService"
import QuestionService from "../services/QuestionService"
import AnswerService from "../services/AnswerService"
import ReportService from 'src/services/ReportService';
import jwt_decode from "jwt-decode";



export default function Answer({ answer }) {
  const [date, setDate] = useState();
  const [error, setError] = useState();
  const [endorsed, setEndorsed] = useState(false)
  const [endorsementcount, setEndorsementCount] = useState()
  const [isanswerendorsed, setIsAnswerEndorsed] = useState(false)
  const [isexpert, setIsExpert] = useState(false)
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
        setToastText("Answer successfully reported");
        setToastColor("bg-success");
        setShowToast(true);
      })
      .catch(err => {
        try {
          if (err.response.status == 400) {
            setToastText(err.response.data);
            setToastColor("bg-warning");
          }
          else if (err.response.status == 401) {
            setToastText("You need to be logged in to report an answer!");
            setToastColor("bg-warning");
          }
          else {
            setToastText("Oops! Something went wrong, try again later.");
            setToastColor("bg-danger");
          }
          setShowToast(true);
        }
        catch {
          setToastText("Oops! Something went wrong, try again later.");
          setToastColor("bg-danger");
          setShowToast(true);
        }
      });
  };
  //#endregion


  const UpdateVotesAnswers = () => {
    AnswerService.GetAnswer(answer.id).then((res) => {
      setTotalVotes(res.data.upvotes - res.data.downvotes)
    })
      .catch((error) => {
      });
  }

  useEffect(() => {
    const tokenExist = localStorage.getItem("Token");
    HandleIsAnswerEndorsed()
    if (tokenExist) {
        let decoded = jwt_decode(tokenExist);
        var expert = Object.values(decoded)[2];
        if (expert == "Expert") {
          setIsExpert(true)
        }
      setIsLoggedIn(true);
      HandleIsAnswerEndorsed()
      AnswerService.GetAnswerEndorsement(answer.id).then((res) => {
        if (res.data != null) {
          setEndorsed(true)
        }
      })
        .catch((error) => {
          console.log(error.response)
        });
      VotesService.GetAnswerVote(answer.id).then((res) => {
        if (res.data.vote == 1 | -1) {
          setVote({ ...vote, vote: res.data.vote })
          setVoted(true)
        }
      })
        .catch((error) => {
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
        setEndorsed(true)
        HandleIsAnswerEndorsed()
      })
        .catch((error) => {
          setError("Error posting endorsement, please try again")
        });
    }
    else {
      AnswerService.DeleteAnswerEndorsement(answer.id).then((res) => {
        setEndorsed(false)
        HandleIsAnswerEndorsed()
      })
        .catch((error) => {
          setError("Error deleting endorsement, please try again")
        });
    }
  }

  const HandleIsAnswerEndorsed = () => {
    AnswerService.GetAllAnswerEndorsements(answer.id).then((res) => {
      if (res.data != '') {
        setIsAnswerEndorsed(true)
        setEndorsementCount(res.data.length)
      }
      else {
        setIsAnswerEndorsed(false)
      }
    })
      .catch((error) => {
        setIsAnswerEndorsed(false)
      })
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
              <a href="/loginpage"><div href="/registerpage"><FontAwesomeIcon className="votingArrowDisabled" icon={faChevronUp} /></div></a>
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
                <div><FontAwesomeIcon className="endorseIconSelected" icon={faCheck} onClick={HandleEndorseClick} /></div>
              )
            } else {
              return (
                <div><FontAwesomeIcon className="endorseIcon" icon={faCheck} onClick={HandleEndorseClick} /></div>
              )
            }
          }
        })()}
      </div>
    )
  }
  const ShowIsPostEndorsed = () => {
    return (
      <div><div className="endorseHasbeenEndorsed"><FontAwesomeIcon className="endorseIconSelected" icon={faCheck} /> This post has been endorsed, {endorsementcount} times!</div><br /></div>
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
      <Row className="mb-2">
        <Col md={11} className="mx-auto">
          <Card className="answerBody">
            <Card.Body>
              <Row>
                <Col md={11}>
                  {error &&
                    <h6 className="errorVoting"> {error} </h6>}
                  {isanswerendorsed ? <ShowIsPostEndorsed /> : null}
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
                  <FontAwesomeIcon className="flagIcon WhiteLinks" icon={faFlag} onClick={HandleAnswerFlagClick} />
                  {isexpert ? <ShowEndorse /> : null}
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="answerFooter">
              <div className="d-flex">
                <img
                  className="questionPageAvatar"
                  src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"
                ></img>
                <a href={"/profile/" + answer.userName} className="answerUsername">
                  {answer.userName}
                  {answer.userRole === "Expert" ? (
                    <FontAwesomeIcon
                      className="checkIcon ml-2"
                      icon={faUserGraduate}
                    />
                  ) : (
                      <></>
                    )}
                </a>
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
