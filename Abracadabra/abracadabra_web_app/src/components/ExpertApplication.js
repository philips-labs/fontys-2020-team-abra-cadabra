import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import AccountService from "../services/AccountService";
import SubjectService from "../services/SubjectService";
import ExpertService from "../services/ExpertService";
import Router from "next/router";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import { getSuggestedQuery } from "@testing-library/dom";

const ExpertApplication = () => {
  //   let applicationId = sessionStorage.getItem("UserId");
  const [userName, setUserName] = useState({
    userId: "",
    username: "",
    email: "",
    password: "",
  });
  const [subjects, setSubjcts] = useState([]);
  const [apply, setApply] = useState({
    userId: "bda67d6c-4568-46ee-8d03-1912a1cc30ab",
    subjectName: "Cooking",
    motivation: "",
  });
  const [pending, setPending] = useState([]);

  const handleChange = (event) => {
    setApply({ ...apply, [event.target.name]: event.target.value });
    console.log(apply);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("foutje");
    ExpertService.applyExpert(apply)
      .then((res) => {
        console.log(res);
        refresh();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const getUser = async () => {
    let userId = sessionStorage.getItem("UserId");
    AccountService.getUser(JSON.parse(JSON.stringify(userId))).then(
      (response) => {
        setUserName(response.data);
      }
    );
  };

  const getSubjects = async () => {
    SubjectService.GetAllSubjects().then((response) => {
      setSubjcts(response.data);
    });
  };

  const pendingSubjects = async () => {
    let userId = sessionStorage.getItem("UserId");
    ExpertService.getPending(JSON.parse(JSON.stringify(userId))).then(
      (response) => {
        console.log(response.data);
        setPending(response.data);
      }
    );
  };

  const refresh = () => {
    pendingSubjects();
  };

  function HumanDateTime(dateAndTime) {
    var date = new Date(dateAndTime + "Z");
    date = date.toUTCString().split(", ");
    date = date[1].slice(0, 17);

    return date;
  }

  useEffect(() => {
    getUser();
    getSubjects();
    pendingSubjects();
  }, []);
  if (pending.length > 0) {
    return (
      <>
        <Container className="h-75" style={{ marginTop: "20px" }}>
          <Row className="h-100 justify-content-center align-items-center">
            <Col xl={8} md={11} className="LoginArea pb-3 rounded">
              <Row>
                <Col>
                  <h3 style={{ textAlign: "center" }}>
                    Apply to be an expert {userName.username}
                  </h3>
                </Col>
              </Row>
              <Row className="editUserContainer pb-3 rounded">
                <Col>
                  <Row>
                    <Col md={6} className="p-3">
                      <h5>Apply for expert:</h5>
                      <form onSubmit={handleSubmit}>
                        <div class="form-group">
                          <label for="sel1">Subjects:</label>
                          <select
                            class="form-control"
                            id="sel1"
                            onChange={handleChange}
                            name="subjectName"
                          >
                            {subjects.map((subject) => (
                              <option
                                key={subject.id}
                                value={subject.subjectName}
                              >
                                {" "}
                                {subject.subjectName}{" "}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="comment">Motivation:</label>
                          <textarea
                            class="form-control"
                            rows="5"
                            name="motivation"
                            id="comment"
                            placeholder="Motiviation.."
                            onChange={handleChange}
                            required
                          ></textarea>
                        </div>
                        <Row>
                          <Col md={9}>
                            <Button
                              style={{ width: "100%" }}
                              className="mt-2 btn-info"
                              onClick={handleSubmit}
                              type="sumbit"
                            >
                              Apply
                            </Button>
                          </Col>
                          <Col md={3}>
                            <Button
                              style={{ width: "100%" }}
                              className="mt-2 btn-secondary"
                              href="/EditUserPage"
                            >
                              Close
                            </Button>
                          </Col>
                        </Row>
                      </form>
                    </Col>
                    <Col md={6} className="p-3">
                      <h5>Pending applictations:</h5>
                      {pending.map((pendings) => (
                        <div
                          className="expertPendingBox"
                          key={pendings.subjectName}
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title={
                            "Created on: " +
                            HumanDateTime(pendings.dateTimeCreated)
                          }
                        >
                          <Row>
                            <Col md={5}>
                              <p>{pendings.subjectName}</p>
                            </Col>
                            <Col md={7}>
                              <p className="float-right">{pendings.status}</p>
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container className="h-75" style={{ marginTop: "20px" }}>
          <Row className="h-100 justify-content-center align-items-center">
            <Col xl={8} md={11} className="LoginArea pb-3 rounded">
              <Row>
                <Col>
                  <h3 style={{ textAlign: "center" }}>
                    Apply to be an expert {userName.username}
                  </h3>
                </Col>
              </Row>
              <Row className="editUserContainer pb-3 rounded">
                <Col>
                  <Row>
                    <Col md={6} className="p-3">
                      <h5>Apply for expert:</h5>
                      <form onSubmit={handleSubmit}>
                        <div class="form-group">
                          <label for="sel1">Subjects:</label>
                          <select
                            class="form-control"
                            id="sel1"
                            onChange={handleChange}
                            name="subjectName"
                          >
                            {subjects.map((subject) => (
                              <option
                                key={subject.id}
                                value={subject.subjectName}
                              >
                                {" "}
                                {subject.subjectName}{" "}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="comment">Motivation:</label>
                          <textarea
                            class="form-control"
                            rows="5"
                            name="motivation"
                            id="comment"
                            placeholder="Motiviation.."
                            onChange={handleChange}
                            required
                          ></textarea>
                        </div>
                        <Row>
                          <Col md={9}>
                            <Button
                              style={{ width: "100%" }}
                              className="mt-2 btn-info"
                              onClick={handleSubmit}
                              type="sumbit"
                            >
                              Apply
                            </Button>
                          </Col>
                          <Col md={3}>
                            <Button
                              style={{ width: "100%" }}
                              className="mt-2 btn-secondary"
                              href="/EditUserPage"
                            >
                              Close
                            </Button>
                          </Col>
                        </Row>
                      </form>
                    </Col>
                    <Col md={6} className="p-3">
                      <h5>Pending applictations:</h5>
                      No applications yet...
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
};

export default ExpertApplication;
