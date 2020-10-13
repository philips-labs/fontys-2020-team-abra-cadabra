import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHome, faLock, faSearch, faTimes, faUser, faUserCircle, faUsers } from '@fortawesome/free-solid-svg-icons';

function Title() {
  return (
				<div className="main-login main-center">
                    <h2 className="text-center">Login</h2>
					<form>
						<div class="form-group input-group">
							<div class="input-group-prepend">
		    					<span class="input-group-text"> <FontAwesomeIcon icon={faEnvelope}/></span>
		 					</div>
        					<input name="email" class="form-control" placeholder="Email" type="text"/>
    					</div>

						<div class="form-group input-group">
							<div class="input-group-prepend">
		    					<span class="input-group-text"> <FontAwesomeIcon icon={faLock}/></span>
		 					</div>
        					<input name="password" class="form-control" placeholder="Password" type="text"/>
    					</div>
						<div className="form-group ">
							<button type="button" className="btn btn-primary btn-lg btn-block login-button">Login</button>
						</div>
						<div className="login-register">
				            <a href="/registerpage">Don't have an account? Create one!</a>
				         </div>
					</form>
				</div>
  );
}

export default Title;
