import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
//import react-bootstrap navbar parts
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
//import react bootstrap
import {
  Image,
  Row,
  Button,
  InputGroup,
  FormControl,
  Col,
} from "react-bootstrap";
//nextjs router hook
import { useRouter } from "next/router";
//import image
import Logo from "src/images/Abra_Logo_Centered.png";
import cookingLogo from "../images/logo_cooking_wip.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faTimes,
  faUserCircle,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import { search } from "__mocks__/fileMock";

export default function NavBar({ subjectTitle }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [searchString, setSearchString] = useState({ searchString: "" });

  //#region Profile/logout
  const [LoginStatus, setLoginStatus] = useState(false);
  const [CurrentUser, setCurrentUser] = useState("");

  useEffect(() => {
    //Get token and decode it for login status
    const token = localStorage.getItem("Token");
    token != null ? setLoginStatus(true) : setLoginStatus(false);
    if (token != null) {
      let decoded = jwt_decode(token);
      //decode token and set name
      setCurrentUser(decoded.unique_name);
    }
    else {
      setCurrentUser("");
    }

  }, []);

  const handleLogout = () => { localStorage.removeItem("Token"); setLoginStatus(false); setCurrentUser(""); };
  //#endregion Profile/logout



  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const handleShow = () => setShow(!show);

  function handleClick(e) {
    if (!e.target.closest("#dropdown") && open) {
      handleOpen();
    } else if (!e.target.closest("#dropdown_item") && open) {
      handleOpen();
    }
  }
  const handleChange = (event) => {
    setSearchString({
      ...searchString,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      className="Default-Navbar"
    >
      <Navbar.Brand className="p-0 d-flex">
        <a href="/">
          <Image src={Logo} height={60} className="my-auto" />
        </a>
        <a href={"/subject/" + subjectTitle} className="my-auto">
          <h3 className="text-capitalize">{subjectTitle}</h3>
        </a>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Row className="mr-auto w-100">
          <Col md={4}>
            <InputGroup className="my-auto NavbarMarginLeft">
              <FormControl
                placeholder="Search.."
                aria-label="Search questions"
                name="searchString"
                onChange={handleChange}
              />
              <InputGroup.Append>
                <Button
                  href={
                    "/subject/" +
                    subjectTitle +
                    "/search/" +
                    searchString.searchString
                  }
                  variant="secondary"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col md={6}></Col>
          <Col md={2}>
            <Button
              href={"/subject/" + subjectTitle + "/createquestion"}
              variant="outline-secondary"
            >
              Ask <FontAwesomeIcon className="ml-1" icon={faQuestionCircle} />
            </Button>
          </Col>
        </Row>
        <Nav className="ml-auto">
          <Row>
            {LoginStatus == false ?
              <Nav.Link href="/loginpage" className="ml-2 mr-5">Login</Nav.Link>
              :
              <>
                <NavDropdown title={CurrentUser} id="nav-dropdown" className="p-0">
                  <NavDropdown.Item eventKey="1" href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item eventKey="2" onClick={handleLogout}>Sign out</NavDropdown.Item>
                </NavDropdown>
              </>
            }

          </Row>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
