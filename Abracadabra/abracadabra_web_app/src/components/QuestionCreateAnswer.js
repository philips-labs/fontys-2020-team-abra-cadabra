import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import QuestionService from "../services/QuestionService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

function QuestionCreateAnwser({QID, UpdateAnswers}) {
  const [validated, setValidated] = useState(false);
  const [isloggedin, setIsLoggedIn] = useState(false);
  const [answerActive, setAnswerActive] = useState(false);

  const [answer, setAnswer] = useState({
    answercontent: "",
    questionid: QID,
  });
  useEffect(() => {
    const tokenExist = localStorage.getItem("Token");
    if (tokenExist) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    setAnswer({ answercontent: "", questionid: QID });
  }, [QID]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      QuestionService.QuestionAnswer(answer)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          UpdateAnswers(res.data)
          setAnswer({ ...answer, answercontent: null });
        })
        .catch((error) => {
          console.log(error.response);
        });
    }

    setValidated(true);
  };

  const handleChange = (event) => {
    setAnswer({ ...answer, [event.target.name]: event.target.value });
  };

  const changeToActive = () => {
    setAnswerActive(!answerActive);
  };

  return (
    <>
      {answerActive ? (
        <Row>
          <Col md={11} className="mx-auto mb-2">
            <div className="BodyQuestion-CardBody giveAnAnswerExtended">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <Form.Group
                      className="textarea"
                      controlId="validationCustom01"
                    >
                      <Row onClick={changeToActive}>
                        <Col md={11}>
                          <Form.Label>
                            <h4>Give an answer</h4>
                          </Form.Label>
                        </Col>
                        <Col className="text-right">
                          <FontAwesomeIcon className="giveAnAnswerArrows" icon={faChevronUp} />
                        </Col>
                      </Row>
                      <Form.Control
                        required
                        as="textarea"
                        rows="2"
                        disabled={!isloggedin}
                        placeholder="You know the answer, fill it in here!"
                        name="answercontent"
                        value={answer.answercontent}
                        onChange={handleChange}
                        style={{ height: "100px" }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please insert an answer
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="justify-content-md-center">
                  <Col md sm="1">
                    <div className="float-md-right">
                      <Button
                        disabled={!isloggedin}
                        type="submit"
                        variant="info"
                      >
                        Submit Answer
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      ) : (
          <Row>
            <Col md={11} className="mx-auto mb-2" onClick={changeToActive}>
              <div className="BodyQuestion-CardBody giveAnAnswer">
                <Row>
                  <Col md={11}>
                    <Form.Label>
                      <h4>Give an answer</h4>
                    </Form.Label>
                  </Col>
                  <Col className="text-right">
                    <FontAwesomeIcon className="giveAnAnswerArrows" icon={faChevronDown} />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        )
      }
    </>
  );
}

export default QuestionCreateAnwser;
