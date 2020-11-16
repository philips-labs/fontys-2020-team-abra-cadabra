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
}
export default FilterButtons;
