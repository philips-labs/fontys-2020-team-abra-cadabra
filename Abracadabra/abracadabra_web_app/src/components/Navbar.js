import React, { useState, useEffect } from "react";
import cookingLogo from "../images/logo_cooking_wip.png";
import logo from "src/images/Abra_Logo_Centered.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faTimes,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import { search } from "__mocks__/fileMock";

function Navbar({ subjectTitle }) {
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
    <>
      <nav className="navbar mr-auto d-flex" data-testid="navbar">
        <a className="navbarHubIcon" href="/"><FontAwesomeIcon icon={faHome} /></a>
        <div className="navbarCollapse d-flex mx-auto">
          <a className="navbar-brand d-flex" href={"/subject/" + subjectTitle}>
            <img src={logo} className="navbarLogo" />
            <h1 className="navbarText mt-2">{subjectTitle}</h1>
          </a>
          <div className='align-self-center'>
            <div className="input-group mt-3 mb-3 search-box">
              <input
                type="text"
                placeholder="Search.."
                aria-label="Search questions"
                name="searchString"
                onChange={handleChange}
              ></input>
              <div className="input-group-append">
                <a
                  href={
                    "/subject/" +
                    subjectTitle +
                    "/search/" +
                    searchString.searchString
                  }
                >
                  <button
                    type="button"
                    className="btn btn-outline-secondary navbarButton"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </a>
              </div>
            </div>
          </div>
          <a
            href={"/subject/" + subjectTitle + "/createquestion"}
            className="btn btn-outline-secondary navbarButton align-self-center ml-2"
          >
            Ask a Question
          </a>
        </div>
        {/* </div> */}
        <a className="navbarHubIconMobile" href="/">
          <FontAwesomeIcon icon={faHome} />
        </a>
        <button
          className="searchMobile mx-auto"
          onClick={handleShow}
          id="mobile_search"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>

        {/* <a className="navbarHubIcon" href="/loginpage"><FontAwesomeIcon icon={faUserCircle} /></a> */}
        <a className="navbarAvatarButton" href="/loginpage">
          <FontAwesomeIcon className="navbarAvatar" icon={faUserCircle} />
        </a>
        {/* {open ? <FontAwesomeIcon className="navbarX" icon={faTimes} /> : <FontAwesomeIcon className="navbarAvatar" icon={faUserCircle} />} */}
      </nav>
     

      <Modal centered show={show} onShow={handleClose} onHide={handleShow}>
        <Modal.Body className="d-flex flex-column">
          <button
            className="navbarModalButton ml-auto mb-1 mr-1"
            onClick={handleShow}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <form action="">
            <input
              className="navbarModalInput"
              type="text"
              placeholder="Search.."
              name="search"
            ></input>
            <button className="navbarModalSearchButton mt-1" type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Navbar;
