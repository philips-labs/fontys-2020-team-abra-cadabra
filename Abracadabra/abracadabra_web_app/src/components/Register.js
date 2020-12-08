import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUsers } from "@fortawesome/free-solid-svg-icons";
import AccountService from "../services/AccountService";
import Router from "next/router";
//bootstrap
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
//components

const Register = () => {
  const [register, setRegister] = useState({
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
    setRegister({ ...register, [event.target.name]: event.target.value });
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
    if (register.username.length === 0) {
      userNameErrorList.push("Can't be empty");
      isValid = false;
    }

    //check if username doesn't contain symbols
    if (!RegExp(/^[a-zA-Z0-9]+$/).test(register.username)) {
      userNameErrorList.push("Can't contain any symbols");
      isValid = false;
    }

    //check if email isn't empty
    if (register.email.length === 0) {
      emailErrorList.push("Can't be empty");
      isValid = false;
    }

    //check if email contains . and @
    if (
      !RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      ).test(register.email)
    ) {
      emailErrorList.push("Not a valid e-mail address");
      isValid = false;
    }

    //check if passwords match
    if (confirmPassword !== register.password) {
      passwordErrorList.push("Passwords don't match");
      isValid = false;
    }
    //check if password is between 8 and 200 characters
    if (
      register.password.length < 8 ||
      register.password.length > 200 ||
      register.password.length === 0
    ) {
      passwordErrorList.push("Must be 8-200 characters long");
      isValid = false;
    }
    // Check for capital letters
    if (!RegExp(/.*[A-Z]+.*/g).test(register.password)) {
      passwordErrorList.push("Must contain a capital letter");
      isValid = false;
    }
    // Check for lower letters
    if (!RegExp(/.*[a-z]+.*/g).test(register.password)) {
      passwordErrorList.push("Must contain a lower letter");
      isValid = false;
    }
    // check for numbers
    if (!RegExp(/.*[0-1-2-3-4-5-6-7-8-9]+.*/g).test(register.password)) {
      passwordErrorList.push("Must contain a number");
      isValid = false;
    }
    if (isValid === false) {
      setMessagePassword(passwordErrorList);
      setMessageUserName(userNameErrorList);
      setMessageEmail(emailErrorList);
      return;
    }

    AccountService.Register(register)
      .then((res) => {
        setMessage("Account created");
        Router.push("/loginpage");
      })
      .catch((error) => {
        //console.log(error);
        setMessage("Something went wrong, try again in a few minutes ...");
      });
  };
  return (
    <>
      <Container className="LoginContainer">
        <Row className="h-100 justify-content-center align-items-center">
          <Col xl={6} md={8} className="LoginArea pb-3 rounded">
            <Row className="mb-1 p-3">
              <Col className="pl-0">
                <h4 className="font-weight-bold">Register</h4>
              </Col>
              <Col md={8} xs={6} className="text-right">
                <a className="LoginLink" href="/loginpage">
                  Already have an account? Login!
                </a>
              </Col>
            </Row>
            <Row className="justify-content-center mb-2">
              <Col md={8}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="email" className="mb-4">
                    <Form.Label className="font-weight-bold">
                      Username
                    </Form.Label>
                    <Form.Control
                      data-testid="register-input-username"
                      type="text"
                      placeholder="Enter username"
                      onChange={handleChange}
                      name="username"
                      required
                    />
                  </Form.Group>
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
                  <Form.Group controlId="email" className="mb-4">
                    <Form.Label className="font-weight-bold">Email</Form.Label>
                    <Form.Control
                      type="text"
                      data-testid="register-input-email"
                      placeholder="Enter email"
                      name="email"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
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
                  <Form.Group controlId="password" className="mb-4">
                    <Form.Label className="font-weight-bold">
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      data-testid="register-input-password"
                      placeholder="Enter password"
                      name="password"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
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
                  <Form.Group controlId="password" className="mb-4">
                    <Form.Label className="font-weight-bold">
                      Repeat-Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      data-testid="register-input-repeat-password"
                      placeholder="Repeat password"
                      onChange={handleConfirmPasswordChange}
                      name="confirmPassword"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="LoginButton" className="mb-4">
                    <Button
                      type="submit"
                      variant="info"
                      className="btn-block"
                      data-testid="register-input-submit"
                    >
                      Registering
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <div
                className="text-danger mx-auto"
                role="alert"
                style={{ textAlign: "center" }}
              >
                <p>{message}</p>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
