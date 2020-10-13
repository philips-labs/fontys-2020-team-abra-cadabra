import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHome, faLock, faSearch, faTimes, faUser, faUserCircle, faUsers } from '@fortawesome/free-solid-svg-icons';
import AccountService from "../services/AccountService";

const Register = () => {
	const [register, setRegister] = useState({ username: "", email: "", password: ""});
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
		if(confirmPassword !== register.password){
			setMessage("passwords don't match")
			return
		}
	  AccountService.Register(register).then((res) => {
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
		    					<span className="input-group-text" style={{width:"45px"}}> <FontAwesomeIcon icon={faUsers}/></span>
		 					</div>
        					<input onChange={handleChange} name="username" className="form-control" placeholder="Username" type="text" required/>
    					</div>

						<div className="form-group input-group">
							<div className="input-group-prepend">
		    					<span className="input-group-text" style={{width:"45px"}}> <FontAwesomeIcon icon={faEnvelope}/></span>
		 					</div>
        					<input onChange={handleChange} name="email" className="form-control" placeholder="Email" type="email" required/>
    					</div>

						<div className="form-group input-group">
							<div className="input-group-prepend">
		    					<span className="input-group-text" style={{width:"45px"}}> <FontAwesomeIcon icon={faLock}/></span>
		 					</div>
        					<input onChange={handleChange} name="password" className="form-control" placeholder="Password" type="password" required/>
    					</div>

						<div className="form-group input-group">
							<div className="input-group-prepend">
		    					<span className="input-group-text" style={{width:"45px"}}> <FontAwesomeIcon icon={faLock}/></span>
		 					</div>
        					<input onChange={handleConfirmPasswordChange} name="confirmPassword" className="form-control" placeholder="Confirm password" type="password" required
							  />
    					</div>
						<div className="form-group ">
							<button type="sumbit" className="btn btn-primary btn-lg btn-block login-button">Register</button>
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
}

export default Register;
