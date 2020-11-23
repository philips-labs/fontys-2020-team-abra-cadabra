import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";

const SubjectList = () => {
  return (
    <>
      <div>
        <div className="row h-5 m-0 pt-3">
          <a href="/" className="mx-auto listlink">
            Click here to go back to landingpage
          </a>
        </div>
        <div className="questionHead mx-auto">
          <div className="questionHeadDiv">
            <h3 className="subjectlistIndicator">A</h3>
          </div>
          <Row className="rowOverflow">
            <Col md={2} className="colOverFlow">
              <div className="divpartsubject">
                <h3>Subject title</h3>
                <p>Questions: 50K</p>
              </div>
            </Col>
            <Col md={2} className="colOverFlow">
              <div className="divpartsubject">
                <h3>Subject title</h3>
                <p>Questions: 50K</p>
              </div>
            </Col>
            <Col md={2} className="colOverFlow">
              <div className="divpartsubject">
                <h3>Subject title</h3>
                <p>Questions: 50K</p>
              </div>
            </Col>
            <Col md={2} className="colOverFlow">
              <div className="divpartsubject">
                <h3>Subject title</h3>
                <p>Questions: 50K</p>
              </div>
            </Col>
            <Col md={2} className="colOverFlow">
              <div className="divpartsubject">
                <h3>Subject title</h3>
                <p>Questions: 50K</p>
              </div>
            </Col>
            <Col md={2} className="colOverFlow">
              <div className="divpartsubject">
                <h3>Subject title</h3>
                <p>Questions: 50K</p>
              </div>
            </Col>
            <Col md={2} className="colOverFlow">
              <div className="divpartsubject">
                <h3>Subject title</h3>
                <p>Questions: 50K</p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="questionHead mx-auto">
          <div className="questionHeadDiv">
            <h3 className="subjectlistIndicator">B</h3>
          </div>
          <Row>
            <Col md={2} className="colOverFlow">
              <div className="divpartsubject">
                <h3>Subject title</h3>
                <p>Questions: 50K</p>
              </div>
            </Col>
            <Col md={2} className="colOverFlow">
              <div className="divpartsubject">
                <h3>Subject title</h3>
                <p>Questions: 50K</p>
              </div>
            </Col>
            <Col md={2} className="colOverFlow">
              <div className="divpartsubject">
                <h3>Subject title</h3>
                <p>Questions: 50K</p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="questionHead mx-auto">
          <div className="questionHeadDiv">
            <h3 className="subjectlistIndicator">C</h3>
          </div>
          <Row>
            <Col md={2} className="colOverFlow">
              <a href="subject/cooking">
                <div className="divpartsubject">
                  <h3>Cooking</h3>
                  <p>Questions: 50K</p>
                </div>
              </a>
            </Col>
            <Col md={2} className="colOverFlow">
              <div className="divpartsubject">
                <h3>Subject title</h3>
                <p>Questions: 50K</p>
              </div>
            </Col>
            <Col md={2} className="colOverFlow">
              <div className="divpartsubject">
                <h3>Subject title</h3>
                <p>Questions: 50K</p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default SubjectList;
