import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  faChevronUp,
  faChevronDown,
  faFlag,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function Question({ question }) {
  const [date, setDate] = useState();

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
              <Col md={8}>
                <p>{question.description}</p>
              </Col>
              <Col md={3} className="text-right">
                <p>Posted on: {date}</p>
              </Col>
              <Col md={1} className="votingDiv">
                  <FontAwesomeIcon className="votingArrow" icon={faChevronUp} />
                  <p>1</p>
                  <FontAwesomeIcon
                    className="votingArrow"
                    icon={faChevronDown}
                    onClick={() => firstClick(-1)}
                  />
                </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}
