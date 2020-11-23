import React, { useState, useEffect } from "react";
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

    console.log(searchString);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
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
          <h3>{subjectTitle}</h3>
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
            <Button href="#" variant="outline-secondary">
              Ask <FontAwesomeIcon className="ml-1" icon={faQuestionCircle} />
            </Button>
          </Col>
        </Row>
        <Nav>
          <Row>
            <Nav.Link href="#" className="ml-3 my-auto mr-2">
              Username
            </Nav.Link>
          </Row>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
