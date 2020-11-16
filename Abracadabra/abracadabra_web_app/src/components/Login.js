import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import AccountService from "../services/AccountService";
import Router from "next/router";
import { Row } from 'react-bootstrap';

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
      })
      .catch((error) => {
        setMessage("Account information does not match");
      });
  };
  return (
   
    <div className="container mt-4">
    
Top

</div>
    






    // <div className="main-login main-center">
    //   <h2 className="text-center">Login</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className="form-group input-group">
    //       <div className="input-group-prepend">
    //         <span className="input-group-text">
    //           {" "}
    //           <FontAwesomeIcon icon={faEnvelope} />
    //         </span>
    //       </div>
    //       <input
    //         onChange={handleChange}
    //         name="email"
    //         className="form-control"
    //         placeholder="Email"
    //         type="email"
    //         required
    //       />
    //     </div>

    //     <div className="form-group input-group">
    //       <div className="input-group-prepend">
    //         <span className="input-group-text">
    //           {" "}
    //           <FontAwesomeIcon icon={faLock} />
    //         </span>
    //       </div>
    //       <input
    //         onChange={handleChange}
    //         name="password"
    //         className="form-control"
    //         placeholder="Password"
    //         type="password"
    //         required
    //       />
    //     </div>
    //     <div className="form-group ">
    //       <button
    //         type="submit"
    //         className="btn btn-primary btn-lg btn-block login-button"
    //       >
    //         Login
    //       </button>
    //     </div>
    //     <div className="login-register">
    //       <a href="/registerpage">Don't have an account? Create one!</a>
    //     </div>
    //     <div
    //       className="text-danger"
    //       role="alert"
    //       style={{ textAlign: "center" }}
    //     >
    //       {message}
    //     </div>
    //   </form>
    // </div>
  );
};

export default Login;
