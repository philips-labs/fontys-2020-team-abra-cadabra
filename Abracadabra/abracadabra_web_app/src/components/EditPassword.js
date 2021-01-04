import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import AccountService from "../services/AccountService";
import Router from "next/router";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import { getSuggestedQuery } from "@testing-library/dom";

const EditPassword = () => {
  const [editPassword, setEditPassword] = useState({
    id: "",
    currentPassword: "",
    password: "",
  });

  const [userName, setUserName] = useState({
    id: "",
    username: "",
  });
  const [message, setMessage] = useState("");
  const [messagePassword, setMessagePassword] = useState([]);
  const [messageCurrentPassword, setMessageCurrentPassword] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (event) => {
    setEditPassword({
      ...editPassword,
      [event.target.name]: event.target.value,
    });
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    var isValid = true;
    var passwordErrorList = [];
    var passwordCurrentErrorList = [];

    event.preventDefault();
    setMessagePassword([]);
    setMessageCurrentPassword([]);
    setMessage("");

    //check if passwords match
    if (confirmPassword !== editPassword.password) {
      passwordErrorList.push("Passwords don't match");
      isValid = false;
    }
    //check if password is between 8 and 200 characters
    if (
      editPassword.password === undefined ||
      editPassword.password.length < 8 ||
      editPassword.password.length > 200 ||
      editPassword.password.length === 0
    ) {
      passwordErrorList.push("Must be 8-200 characters long");
      isValid = false;
    }
    // Check for capital letters
    if (!RegExp(/.*[A-Z]+.*/g).test(editPassword.password)) {
      passwordErrorList.push("Must contain a capital letter");
      isValid = false;
    }
    // Check for lower letters
    if (!RegExp(/.*[a-z]+.*/g).test(editPassword.password)) {
      passwordErrorList.push("Must contain a lower letter");
      isValid = false;
    }
    // check for numbers
    if (!RegExp(/.*[0-1-2-3-4-5-6-7-8-9]+.*/g).test(editPassword.password)) {
      passwordErrorList.push("Must contain a number");
      isValid = false;
    }

    if (editPassword.currentPassword === undefined) {
      passwordCurrentErrorList.push("Can't be empty");
      isValid = false;
    }

    if (isValid === false) {
      setMessagePassword(passwordErrorList);
      setMessageCurrentPassword(passwordCurrentErrorList);
      return;
    }

    AccountService.editPassword(editPassword)
      .then((response) => {
        Router.push("/profile");
      })
      .catch((error) => {
        setMessage("Credentials did not match");
      });
  };

  const getUser = async () => {
    let userId = sessionStorage.getItem("UserId");
    AccountService.getUser(JSON.parse(JSON.stringify(userId))).then(
      (response) => {
        setEditPassword(response.data);
        setUserName(response.data);
      }
    );
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Container className="LoginContainer">
        <Row className="h-100 justify-content-center align-items-center">
          <Col xl={6} md={8} className="LoginArea pb-3 rounded">
            <h4 className="font-weight-bold text-center mt-3">
              Edit password of {userName.username}
            </h4>
            <Row className="justify-content-center mb-2">
              <Col md={8}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="oldPassword" className="mb-4">
                    <Form.Label className="font-weight-bold">
                      Current Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter current password"
                      name="currentPassword"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  {messageCurrentPassword.map((message, index) => (
                    <div key={index}>
                      <small className="help-block text-danger">
                        {message}
                      </small>{" "}
                      <br></br>
                    </div>
                  ))}
                  <hr />

                  <Form.Group controlId="password" className="mb-4">
                    <Form.Label className="font-weight-bold">
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
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
                      placeholder="Repeat password"
                      onChange={handleConfirmPasswordChange}
                      name="confirmPassword"
                      required
                    />
                  </Form.Group>
                </Form>
                <Button
                  className="mt-2 btn-info w-100"
                  onClick={handleSubmit}
                >
                  Edit password
                </Button>
                <Button
                  className="mt-2 btn-secondary w-100"
                  href="/profile"
                >
                  Cancel
                </Button>
              </Col>
            </Row>
            <Row>
              <div
                className="text-danger mx-auto text-center"
                role="alert"
              >
                {message}
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditPassword;
