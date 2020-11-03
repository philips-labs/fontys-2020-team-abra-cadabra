import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faHome,
  faLock,
  faSearch,
  faTimes,
  faUser,
  faUserCircle,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import AccountService from "../services/AccountService";
import Router from "next/router";

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
        console.log(res);
        console.log(res.data);
        setMessage("Er is een account aangemaakt!");
        Router.push("/");
      })
      .catch((error) => {
        console.log(error.response.data);
        setMessage(error.response.data.messages);
      });
  };
  return (
    <div className=" container-fluid h-100">
      <div className="row main my-auto">
        <div className="main-login main-center">
          <h2 className="text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" style={{ width: "45px" }}>
                  {" "}
                  <FontAwesomeIcon icon={faUsers} />
                </span>
                <input
                  onChange={handleChange}
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  type="text"
                />
              </div>
              <div>
                {messageUserName.map((message, index) => (
                  <div key={index}>
                    <small className="help-block text-danger">{message}</small>{" "}
                    <br></br>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" style={{ width: "45px" }}>
                  {" "}
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input
                  onChange={handleChange}
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  // type="email"
                />
              </div>
              <div>
                {messageEmail.map((message, index) => (
                  <div key={index}>
                    <small className="help-block text-danger">{message}</small>{" "}
                    <br></br>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" style={{ width: "45px" }}>
                  {" "}
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  onChange={handleChange}
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  type="password"
                />
              </div>
              <div>
                {messagePassword.map((message, index) => (
                  <div key={index}>
                    <small className="help-block text-danger">{message}</small>{" "}
                    <br></br>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" style={{ width: "45px" }}>
                  {" "}
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
              <input
                onChange={handleConfirmPasswordChange}
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm password"
                type="password"
              />
            </div>
            <div className="form-group ">
              <button
                type="sumbit"
                className="btn btn-primary btn-lg btn-block login-button"
              >
                Register
              </button>
            </div>
            <div className="login-register">
              <a href="/loginpage">Login</a>
            </div>
            <div
              className="text-danger"
              role="alert"
              style={{ textAlign: "center" }}
            >
              {message}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
