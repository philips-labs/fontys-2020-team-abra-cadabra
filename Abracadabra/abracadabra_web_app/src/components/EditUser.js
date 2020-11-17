import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import AccountService from "../services/AccountService";
import Router from "next/router";
import { Row, Col, Button, Container, Form } from "react-bootstrap";

const EditUser = () => {
  const [edituserActive, setEditUserActive] = useState(true);

  const changeToActive = () => {
    setEditUserActive(!edituserActive);
  };
  return (
    <>
      <Container className="h-75">
        <Row className="h-100 justify-content-center align-items-center">
          <Col xl={8} md={11} className="LoginArea pb-3 rounded">
            <Row>
              <Col>
                <h3 style={{ textAlign: "center" }}>
                  Profile page for verylongusername
                </h3>
              </Col>
            </Row>
            <Row className="editUserContainer pb-3 rounded">
              <Col>
                <Row>
                  <Col md={6} className="p-3">
                    <form>
                      <div className="form-group">
                        <label>Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          aria-describedby="emailHelp"
                          value="Verylongusername@gmail.com"
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label>Username</label>
                        <input
                          type="Username"
                          className="form-control"
                          value="Verylongusername"
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Password"
                          disabled
                        />
                      </div>
                    </form>
                  </Col>
                  <Col md={6} className="p-3">
                    <Row>
                      <Col md={7} className="mr-auto"></Col>
                      <Col md={5}>
                        <img
                          className="rounded-circle"
                          style={{ height: "125px" }}
                          src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"
                        ></img>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={7} className="mr-auto"></Col>
                      <Col>
                        <Button
                          style={{ width: "100%" }}
                          className="mt-2 btn-info"
                        >
                          Change
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}></Col>
                  <Col md={6}>
                    <Row>
                      <Col md={7} className="mr-auto"></Col>
                      <Col>
                        <Button
                          style={{ width: "100%" }}
                          className="mt-2 btn-info"
                          onClick={changeToActive}
                        >
                          Edit
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* {edituserActive ? (
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <div className="container mt-3">
              <h3 style={{ textAlign: "center" }}>
                Profile page for verylongusername
              </h3>
              <div className="container BodyQuestion-Top">
                <div style={{ marginRight: "5px" }}>
                  <div className="BodyQuestion-CardBody">
                    <Row>
                      <Col md={6}>
                        <form>
                          <div className="form-group">
                            <label>Email address</label>
                            <input
                              type="email"
                              className="form-control"
                              aria-describedby="emailHelp"
                              value="Verylongusername@gmail.com"
                              disabled
                            />
                          </div>
                          <div className="form-group">
                            <label>Username</label>
                            <input
                              type="Username"
                              className="form-control"
                              value="Verylongusername"
                              disabled
                            />
                          </div>
                          <div className="form-group">
                            <label>Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Password"
                              disabled
                            />
                          </div>
                        </form>
                      </Col>
                      <Col md={4}></Col>
                      <Col md={2}>
                        <img
                          className="rounded-circle"
                          style={{ height: "100px" }}
                          src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"
                        ></img>
                        <Button
                          style={{ width: "100px" }}
                          className="mt-2 btn-info"
                        >
                          Change
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={10}></Col>
                      <Col md={2}>
                        {" "}
                        <Button
                          onClick={changeToActive}
                          style={{ width: "100px" }}
                          className="mt-2 btn-secondary"
                        >
                          Edit
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <div className="container mt-3">
              <h3 style={{ textAlign: "center" }}>
                Profile page for verylongusername
              </h3>
              <div className="container BodyQuestion-Top">
                <div style={{ marginRight: "5px" }}>
                  <div className="BodyQuestion-CardBody">
                    <Row>
                      <Col md={6}>
                        <form>
                          <div className="form-group">
                            <label>Email address</label>
                            <input
                              type="email"
                              className="form-control"
                              aria-describedby="emailHelp"
                              value="Verylongusername@gmail.com"
                            />
                          </div>
                          <div className="form-group">
                            <label>Username</label>
                            <input
                              type="Username"
                              className="form-control"
                              value="Verylongusername"
                            />
                          </div>
                          <div className="form-group">
                            <label>Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Password"
                            />
                          </div>
                          <div className="form-group">
                            <label>Repeat password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Repeat password"
                            />
                          </div>
                        </form>
                      </Col>
                      <Col md={4}></Col>
                      <Col md={2}>
                        <img
                          className="rounded-circle"
                          style={{ height: "100px" }}
                          src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"
                        ></img>
                        <Button
                          style={{ width: "100px" }}
                          className="mt-2 btn-info"
                        >
                          Change
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={8}></Col>
                      <Col mc={2}>
                        {" "}
                        <Button
                          style={{ width: "100%" }}
                          className="mt-2 btn-secondary"
                          onClick={changeToActive}
                        >
                          Close
                        </Button>
                      </Col>
                      <Col mc={2}>
                        {" "}
                        <Button
                          style={{ width: "100%" }}
                          className="mt-2 btn-info"
                          onClick={changeToActive}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={3}></Col>
        </Row>
      )} */}
    </>
  );
};

export default EditUser;
