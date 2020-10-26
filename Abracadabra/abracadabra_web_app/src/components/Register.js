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

const Register = () => {
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (event) => {
    setRegister({ ...register, [event.target.name]: event.target.value });
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //check if passwords match
    if (confirmPassword !== register.password) {
      setMessage("passwords don't match");
      return;
    }
    //check if password is between 8 and 200 characters
    if (register.password.length < 8 || register.password.length > 200) {
      setMessage("password must be between 8 and 200 characters");
      return;
    }
    // Check for capital letters
    if (!RegExp(/.*[A-Z]+.*/g).test(register.password)) {
      setMessage("password must contain a capital letter");
      return;
    }
    // Check for lower letters
    if (!RegExp(/.*[a-z]+.*/g).test(register.password)) {
      setMessage("password must contain a lower letter");
      return;
    }
    // check for numbers
    if (!RegExp(/.*[1-2-3-4-5-6-7-8-9]+.*/g).test(register.password)) {
      setMessage("password must contain a number");
      return;
    }

    AccountService.Register(register)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setMessage("Er is een account aangemaakt!");
      })
      .catch((error) => {
        console.log(error.response.data);
        setMessage(error.response.data.message);
      });
  };
  return (
    <div className=" container-fluid h-100">
      <div className="row main my-auto">
        <div className="main-login main-center">
          <h2 className="text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            {/* <div className="form-group input-group">
							<div className="input-group-prepend">
		    					<span className="input-group-text" style={{width:"45px"}}> <FontAwesomeIcon icon={faUser}/></span>
		 					</div>
        					<input name="name" className="form-control" placeholder="Full name (optional)" type="text"/>
    					</div> */}

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" style={{ width: "45px" }}>
                  {" "}
                  <FontAwesomeIcon icon={faUsers} />
                </span>
              </div>
              <input
                onChange={handleChange}
                name="username"
                className="form-control"
                placeholder="Username"
                type="text"
                required
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" style={{ width: "45px" }}>
                  {" "}
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
              <input
                onChange={handleChange}
                name="email"
                className="form-control"
                placeholder="Email"
                type="email"
                required
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" style={{ width: "45px" }}>
                  {" "}
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
              <input
                onChange={handleChange}
                name="password"
                className="form-control"
                placeholder="Password"
                type="password"
                required
              />
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
                required
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
            <div className="alert alert-light" role="alert">
              {message}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
