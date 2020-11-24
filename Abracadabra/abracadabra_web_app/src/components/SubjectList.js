import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import ListItem from "src/components/SubjectListItem";

const SubjectList = () => {

  useEffect(() => {
      //Get subjects
  }, []);



  return (
    <>
      <div className="row h-5 m-0 pt-3">
        <a href="/" className="mx-auto listlink">
          Click here to go back to landingpage
        </a>
      </div>
      <div className="row">
        <nav className="navbar col-sm-1 sidenavcol" id="myScrollspy">
          <ul class="navbar-nav flex-column nav-pills">
            <li class="nav-item">
              <a href="#a">
                <h6 className="navbar-textcolor">A</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#b">
                <h6 className="navbar-textcolor">B</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#c">
                <h6 className="navbar-textcolor">C</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#d">
                <h6 className="navbar-textcolor">D</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#e">
                <h6 className="navbar-textcolor">E</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#f">
                <h6 className="navbar-textcolor">F</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#g">
                <h6 className="navbar-textcolor">G</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#h">
                <h6 className="navbar-textcolor">H</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#i">
                <h6 className="navbar-textcolor">I</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#j">
                <h6 className="navbar-textcolor">J</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#k">
                <h6 className="navbar-textcolor">K</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#l">
                <h6 className="navbar-textcolor">L</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#m">
                <h6 className="navbar-textcolor">M</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#n">
                <h6 className="navbar-textcolor">N</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#o">
                <h6 className="navbar-textcolor">O</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#p">
                <h6 className="navbar-textcolor">P</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#q">
                <h6 className="navbar-textcolor">Q</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#r">
                <h6 className="navbar-textcolor">R</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#s">
                <h6 className="navbar-textcolor">S</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#t">
                <h6 className="navbar-textcolor">T</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#u">
                <h6 className="navbar-textcolor">U</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#v">
                <h6 className="navbar-textcolor">V</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#w">
                <h6 className="navbar-textcolor">W</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#x">
                <h6 className="navbar-textcolor">X</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#y">
                <h6 className="navbar-textcolor">Y</h6>
              </a>
            </li>
            <li class="nav-item">
              <a href="#z">
                <h6 className="navbar-textcolor">Z</h6>
              </a>
            </li>
          </ul>
        </nav>
        <div className="col-sm-9">
          <div id="a">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">A</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="b">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">B</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="c">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">C</h3>
              </div>
              <Row className="rowOverflow">
                <Col md={2} className="colOverFlow">
                  <a href="/subject/cooking">
                    <div className="divpartsubject">
                      <h3>Cooking</h3>
                      <p>Questions: 50K</p>
                    </div>
                  </a>
                </Col>
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="d">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">D</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="e">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">E</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="f">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">F</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="g">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">G</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="h">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">H</h3>
              </div>
              <Row className="rowOverflow"></Row>
            </div>
          </div>
          <div id="i">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">I</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="j">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">J</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="k">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">K</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="l">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">L</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="m">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">M</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="n">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">N</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="o">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">O</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="p">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">P</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="q">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">Q</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="r">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">R</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="s">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">S</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="t">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">T</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="u">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">U</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="v">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">V</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="w">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">W</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="x">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">X</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="y">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">Y</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
          <div id="z">
            <div className="questionHead mx-auto">
              <div className="questionHeadDiv">
                <h3 className="subjectlistIndicator">Z</h3>
              </div>
              <Row className="rowOverflow">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubjectList;
