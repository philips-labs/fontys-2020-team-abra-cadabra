import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
//import react-bootstrap navbar parts 
import Navbar from 'react-bootstrap/Navbar'
//import react bootstrap
import {Image, Row, FormControl, InputGroup,Button, Nav, NavDropdown} from 'react-bootstrap';
//nextjs router hook
import { useRouter } from "next/router";

export default function BlankNavBar() {
      //#region Profile/logout
  const [LoginStatus, setLoginStatus] = useState(false);
  const [CurrentUser, setCurrentUser] = useState("");

  useEffect(() => {
    //Get token and decode it for login status
    const token = localStorage.getItem("Token");
    token != null ? setLoginStatus(true) : setLoginStatus(false);
    if(token != null) {
      let decoded = jwt_decode(token);
      //decode token and set name
      setCurrentUser(decoded.unique_name);
    } 
    else 
    {
      setCurrentUser("");
    }

  }, []);

  const handleLogout = () =>{localStorage.removeItem("Token"); setLoginStatus(false); setCurrentUser(""); };
  //#endregion Profile/logout

    return (
            <Navbar collapseOnSelect expand="lg" variant="dark" className="Default-Navbar">
                <Navbar.Brand href="/" className="p-0 d-flex">   
                    <Image src={"/images/Abra_Logo_Centered.png"} height={60} className="my-auto"/>
                    <h5 className="my-auto">Abracadabra</h5>
                </Navbar.Brand>
                <Nav className="ml-auto">
          <Row>
              {LoginStatus === false ? 
           <Nav.Link href="/loginpage" className="ml-2 mr-5">Login</Nav.Link>
            : 
            <>
                <NavDropdown title={CurrentUser} id="nav-dropdown" className="mr-5 p-0">
                <NavDropdown.Item eventKey="1" href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item eventKey="2" onClick={handleLogout}>Sign out</NavDropdown.Item>
              </NavDropdown>
            </>
          }
            
          </Row>
        </Nav>
                </Navbar>
    );
}