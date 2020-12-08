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

  const [userName, setUserName] = useState({
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

    //check if password is between 8 and 200 characters
    if (
      editUser.password === undefined ||
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

    AccountService.editUser(editUser)
      .then((response) => {
        console.log(response);
        setEditUserActive(!edituserActive);
        getUser();
      })
      .catch((error) => {
        setMessage("Credentials did not match");
      });
  };

  const getUser = async () => {
    let userId = sessionStorage.getItem("UserId");
    AccountService.getUser(JSON.parse(JSON.stringify(userId))).then(
      (response) => {
        setEditUser(response.data);
        setUserName(response.data);
      }
    );
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
                  <h3 className="text-center">
                    Profile page for {userName.username}
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
                            className="profilePageAvatar"
                            src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"
                          ></img>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={7} className="mr-auto"></Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col md={8}>
                          <Button
                            className="mt-2 btn-secondary w-100"
                            href="/editpasswordpage"
                          >
                            Edit Password
                          </Button>
                        </Col>
                        <Col md={4} className="mr-auto">
                          <Button
                            className="mt-2 btn-secondary w-100"
                            href="/expertapplicationpage"
                          >
                            Expert
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={8}>
                          <Button
                            className="mt-2 btn-info w-100"
                            onClick={changeToActive}
                          >
                            Edit Account
                          </Button>
                        </Col>
                        <Col md={4} className="mr-auto"></Col>
                      </Row>
                    </Col>
                    <Col md={6}></Col>
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
                    <h3 className="text-center">
                      Profile page for {userName.username}
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
                          <hr />
                          <div className="form-group">
                            <label>Current password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Current password"
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
                          <Row>
                            <Col md={9}>
                              <Button
                                className="mt-2 btn-info w-100"
                                onClick={handleSubmit}
                                type="sumbit"
                              >
                                Save changes
                            </Button>
                            </Col>
                            <Col md={3}>
                              <Button
                                className="mt-2 btn-secondary w-100"
                                onClick={changeToActive}
                              >
                                Close
                            </Button>
                            </Col>
                          </Row>
                          <Row>
                            <div
                              className="text-danger text-center mt-2 ml-3"
                              role="alert"
                            >
                              {message}
                            </div>
                          </Row>
                        </form>
                      </Col>
                      <Col md={6} className="p-3">
                        <Row>
                          <Col md={7} className="mr-auto"></Col>
                          <Col md={5}>
                            <img
                              className="profilePageAvatar"
                              src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"
                            ></img>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={7} className="mr-auto"></Col>
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
