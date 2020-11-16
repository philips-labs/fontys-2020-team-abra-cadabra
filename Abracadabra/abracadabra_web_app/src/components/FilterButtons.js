import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import {
  faChartLine,
  faFireAlt,
  faCertificate,
  faComment,
  faCommentSlash,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

<<<<<<< HEAD
function FilterButtons() {
  return (
    <div className="rounded container">
      <Row>
        <Col md="7">
          <Button variant="primary">
            <FontAwesomeIcon icon={faCertificate} /> New
          </Button>
          <Button variant="primary">
            <FontAwesomeIcon icon={faFireAlt} /> Hot
          </Button>
          <Button variant="primary">
            <FontAwesomeIcon icon={faChartLine} /> Top
          </Button>
        </Col>
        <Col md="5">
          <Button variant="secondary">
            <FontAwesomeIcon icon={faCommentSlash} /> Unanswered
          </Button>
          <Button variant="secondary">
            <FontAwesomeIcon icon={faComment} /> Answered
          </Button>
          <Button variant="secondary">
            <FontAwesomeIcon icon={faUserGraduate} /> Expert Answered
          </Button>
        </Col>
      </Row>
    </div>
  );
=======
function FilterButtons({ subjectTitle }) {
    return (
        <div class="rounded container">
            <Row>
                <Col md="7">
                    <Button variant="secondary" className="btnSmall" href={'/subject/' + subjectTitle + '/new'}><FontAwesomeIcon icon={faCertificate} /> New</Button>
                    <Button variant="secondary" className="btnSmall" href={'/subject/' + subjectTitle}><FontAwesomeIcon icon={faFireAlt} /> Hot</Button>
                    <Button variant="secondary" className="btnSmall" href={'/subject/' + subjectTitle + '/top'}><FontAwesomeIcon icon={faChartLine} /> Top</Button>
                </Col>
                <Col md="5">
                    <Button variant="secondary" className="btnBig" href={'/subject/' + subjectTitle + '/unanswered'}><FontAwesomeIcon icon={faCommentSlash} /> Unanswered</Button>
                    <Button variant="secondary" className="btnBig"><FontAwesomeIcon icon={faComment} /> Answered</Button>
                    <Button variant="secondary" className="btnBig"><FontAwesomeIcon icon={faUserGraduate} /> Expert Answered</Button>
                </Col>
            </Row>
        </div>
    )
>>>>>>> 598ad2e22f8150ceb8e19c6a8b8d4ac6d40ee6a5
}
export default FilterButtons;
