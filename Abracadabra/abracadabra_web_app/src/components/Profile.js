import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import AccountService from "../services/AccountService";
import { Row, Col, Container, Badge } from "react-bootstrap";

function Profile({ usrNm }) {
  const [userName, setUserName] = useState({
    id: "",
    username: "",
    fields: []
  });

  const getUser = async () => {
    AccountService.getProfile(usrNm).then(
      (response) => {
        setUserName(response.data);
      }
    );
  };

  useEffect(() => {
    getUser();
  }, [usrNm]);

  console.log(userName);

  return (
    <>
      <Container className="h-75">
        <Row className="h-100 justify-content-center align-items-center">
          <Col xl={8} md={11} className="LoginArea pb-3 rounded">
            <Row>
              <Col>
                <h3 style={{ textAlign: "center" }}>
                  Profile page for {userName.username}
                </h3>
              </Col>
            </Row>
            <Row className="editUserContainer pb-3 rounded">
              <Col>
                <Row>
                  <Col md={6} className="p-3">
                    <form>
                      <div className="form-group">
                        <label>Username</label>
                        <input
                          type="Username"
                          className="form-control"
                          value={userName.username}
                          disabled
                        />
                      </div>
                    </form>
                  </Col>
                  <Col md={6} className="p-3">
                    <Row>
                      <Col md={7} className="mr-auto"></Col>
                      <Col md={5}>
                        <img
                          className="rounded-circle"
                          style={{ height: "125px" }}
                          src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"
                        ></img>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            {userName.fields != null ? <Row className="foe">
              <div className="title"><h3>Fields of Expertise</h3></div>
              {userName.fields.map((field) => (
                <Badge variant="primary">{field}</Badge>
              ))}
            </Row> :
              <></>}

          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
