import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import AccountService from "../services/AccountService";
import Router from "next/router";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import { getSuggestedQuery } from "@testing-library/dom";

const EditUser = () => {
  const [edituserActive, setEditUserActive] = useState(true);

  const changeToActive = () => {
    setEditUserActive(!edituserActive);
  };

  const [editUser, setEditUser] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [messagePassword, setMessagePassword] = useState([]);
  const [messageUserName, setMessageUserName] = useState([]);
  const [messageEmail, setMessageEmail] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (event) => {
    setEditUser({ ...editUser, [event.target.name]: event.target.value });
    console.log(editUser.id);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    var isValid = true;
    var passwordErrorList = [];
    var userNameErrorList = [];
    var emailErrorList = [];

    event.preventDefault();
    setMessagePassword([]);
    setMessageUserName([]);
    setMessageEmail([]);
    setMessage("");

    //check if username isn't empty
    if (editUser.username.length === 0) {
      userNameErrorList.push("Can't be empty");
      isValid = false;
    }

    //check if username doesn't contain symbols
    if (!RegExp(/^[a-zA-Z0-9]+$/).test(editUser.username)) {
      userNameErrorList.push("Can't contain any symbols");
      isValid = false;
    }

    //check if email isn't empty
    if (editUser.email.length === 0) {
      emailErrorList.push("Can't be empty");
      isValid = false;
    }

    //check if email contains . and @
    if (
      !RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      ).test(editUser.email)
    ) {
      emailErrorList.push("Not a valid e-mail address");
      isValid = false;
    }

    //check if passwords match
    if (confirmPassword !== editUser.password) {
      passwordErrorList.push("Passwords don't match");
      isValid = false;
    }
    //check if password is between 8 and 200 characters
    if (
      editUser.password.length < 8 ||
      editUser.password.length > 200 ||
      editUser.password.length === 0
    ) {
      passwordErrorList.push("Must be 8-200 characters long");
      isValid = false;
    }
    // Check for capital letters
    if (!RegExp(/.*[A-Z]+.*/g).test(editUser.password)) {
      passwordErrorList.push("Must contain a capital letter");
      isValid = false;
    }
    // Check for lower letters
    if (!RegExp(/.*[a-z]+.*/g).test(editUser.password)) {
      passwordErrorList.push("Must contain a lower letter");
      isValid = false;
    }
    // check for numbers
    if (!RegExp(/.*[0-1-2-3-4-5-6-7-8-9]+.*/g).test(editUser.password)) {
      passwordErrorList.push("Must contain a number");
      isValid = false;
    }
    if (isValid === false) {
      setMessagePassword(passwordErrorList);
      setMessageUserName(userNameErrorList);
      setMessageEmail(emailErrorList);
      return;
    }
  };

  const getUser = async () => {
    let userId = sessionStorage.getItem("UserId");
    AccountService.getUser(JSON.parse(JSON.stringify(userId))).then(
      (response) => {
        setEditUser(response.data);
        // console.log(editUser);
      }
    );
  };

  const saveChanges = async () => {
    AccountService.editUser(editUser).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      {edituserActive ? (
        <Container className="h-75">
          <Row className="h-100 justify-content-center align-items-center">
            <Col xl={8} md={11} className="LoginArea pb-3 rounded">
              <Row>
                <Col>
                  <h3 style={{ textAlign: "center" }}>
                    Profile page for {editUser.username}
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
                            value={editUser.email}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label>Username</label>
                          <input
                            type="Username"
                            className="form-control"
                            value={editUser.username}
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
      ) : (
        <Container className="h-75">
          <Row className="h-100 justify-content-center align-items-center">
            <Col xl={8} md={11} className="LoginArea pb-3 rounded">
              <Row>
                <Col>
                  <h3 style={{ textAlign: "center" }}>
                    Profile page for {editUser.username}
                  </h3>
                </Col>
              </Row>
              <Row className="editUserContainer pb-3 rounded">
                <Col>
                  <Row>
                    <Col md={6} className="p-3">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label>Email address</label>
                          <input
                            type="email"
                            className="form-control"
                            aria-describedby="emailHelp"
                            value={editUser.email}
                            onChange={handleChange}
                            name="email"
                          />
                        </div>
                        <div>
                          {messageEmail.map((message, index) => (
                            <div key={index}>
                              <small className="help-block text-danger">
                                {message}
                              </small>{" "}
                              <br></br>
                            </div>
                          ))}
                        </div>
                        <div className="form-group">
                          <label>Username</label>
                          <input
                            type="Username"
                            className="form-control"
                            value={editUser.username}
                            onChange={handleChange}
                            name="username"
                          />
                        </div>
                        <div>
                          {messageUserName.map((message, index) => (
                            <div key={index}>
                              <small className="help-block text-danger">
                                {message}
                              </small>{" "}
                              <br></br>
                            </div>
                          ))}
                        </div>
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            onChange={handleChange}
                            name="password"
                          />
                        </div>
                        <div>
                          {messagePassword.map((message, index) => (
                            <div key={index}>
                              <small className="help-block text-danger">
                                {message}
                              </small>{" "}
                              <br></br>
                            </div>
                          ))}
                        </div>
                        <div className="form-group">
                          <label>Confirm password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            onChange={handleConfirmPasswordChange}
                            name="confirmPassword"
                          />
                        </div>
                        <Row>
                          <Col md={9}>
                            <Button
                              style={{ width: "100%" }}
                              className="mt-2 btn-info"
                              onClick={saveChanges}
                              type="sumbit"
                            >
                              Save changes
                            </Button>
                          </Col>
                          <Col md={3}>
                            <Button
                              style={{ width: "100%" }}
                              className="mt-2 btn-secondary"
                              onClick={changeToActive}
                            >
                              Close
                            </Button>
                          </Col>
                        </Row>
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
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default EditUser;
