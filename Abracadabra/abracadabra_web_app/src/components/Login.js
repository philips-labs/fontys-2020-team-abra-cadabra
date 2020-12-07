import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import AccountService from "../services/AccountService";
import Router from "next/router";
//bootstrap
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
//components

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    AccountService.Login(login)
      .then((res) => {
        Router.push("/");
        localStorage.setItem("Token", res.data.token);
        sessionStorage.setItem("UserId", res.data.id);
      })
      .catch((error) => {
        setMessage("Account information does not match");
      });
  };
  return (
    <>
      <Container className="LoginContainer">
        <Row className="h-100 justify-content-center align-items-center">
          <Col xl={6} md={8} className="LoginArea pb-3 rounded">
            <Row className="mb-4 p-3">
              <Col className="pl-0">
                <h4 className="font-weight-bold">Login</h4>
              </Col>
              <Col md={8} xs={6} className="text-right">
                <a className="LoginLink" href="/registerpage">
                  Don't have an account? Register!
                </a>
              </Col>
            </Row>
            <Row className="justify-content-center mb-2">
              <Col md={8}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="email" className="mb-4">
                    <Form.Label className="font-weight-bold">Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter email"
                      name="email"
                      onChange={handleChange}
                      data-testid="login-input-email"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="password" className="mb-4">
                    <Form.Label className="font-weight-bold">
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      data-testid="login-input-password"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="LoginButton" className="mb-4">
                    <Button type="submit" variant="info" className="btn-block">
                      Login
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
                {message}
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
