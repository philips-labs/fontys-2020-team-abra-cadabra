import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHome, faLock, faSearch, faTimes, faUser, faUserCircle, faUsers } from '@fortawesome/free-solid-svg-icons';

function Title() {
  return (
    <div className="container-fluid h-100">
			<div className="row main my-auto">
				<div className="main-login main-center">
                    <h2 className="text-center">Register</h2>
					<form>
						<div class="form-group input-group">
							<div class="input-group-prepend">
		    					<span class="input-group-text" style={{width:"45px"}}> <FontAwesomeIcon icon={faUser}/></span>
		 					</div>
        					<input name="name" class="form-control" placeholder="Full name" type="text"/>
    					</div>

						<div class="form-group input-group">
							<div class="input-group-prepend">
		    					<span class="input-group-text" style={{width:"45px"}}> <FontAwesomeIcon icon={faEnvelope}/></span>
		 					</div>
        					<input name="email" class="form-control" placeholder="Email" type="text"/>
    					</div>

						<div class="form-group input-group">
							<div class="input-group-prepend">
		    					<span class="input-group-text" style={{width:"45px"}}> <FontAwesomeIcon icon={faUsers}/></span>
		 					</div>
        					<input name="username" class="form-control" placeholder="Username" type="text"/>
    					</div>

						<div class="form-group input-group">
							<div class="input-group-prepend">
		    					<span class="input-group-text" style={{width:"45px"}}> <FontAwesomeIcon icon={faLock}/></span>
		 					</div>
        					<input name="password" class="form-control" placeholder="Password" type="text"/>
    					</div>

						<div class="form-group input-group">
							<div class="input-group-prepend">
		    					<span class="input-group-text" style={{width:"45px"}}> <FontAwesomeIcon icon={faLock}/></span>
		 					</div>
        					<input name="password" class="form-control" placeholder="Repeat password" type="text"/>
    					</div>
						<div className="form-group ">
							<button type="button" className="btn btn-primary btn-lg btn-block login-button">Register</button>
						</div>
						<div className="login-register">
				            <a href="/loginpage">Login</a>
				         </div>
					</form>
				</div>
			</div>
		</div>
  );
}

export default Title;
