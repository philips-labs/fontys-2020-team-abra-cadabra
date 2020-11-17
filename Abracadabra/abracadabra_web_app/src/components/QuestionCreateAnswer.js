import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import QuestionService from "../services/QuestionService";

function QuestionCreateAnwser(questionSendId) {
  const [validated, setValidated] = useState(false);
  const [isloggedin, setIsLoggedIn] = useState(false);

  const [Answer, setAnswer] = useState({
    answercontent: "",
    questionid: questionSendId.QID,
  });
  useEffect(() => {
    const tokenExist = localStorage.getItem("Token");
    if (tokenExist) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    setAnswer({ answercontent: "", questionid: questionSendId.QID });
  }, [questionSendId]);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      await QuestionService.QuestionAnswer(Answer)
        .then((res) => {
          console.log(res);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    setValidated(true);
  };

  const handleChange = (event) => {
    setAnswer({ ...Answer, [event.target.name]: event.target.value });
  };

  const [showResults, setShowResults] = React.useState(false);
  const onClick = () => setShowResults(true);

  return (
    <div className="container mt-5">
      <div className="BodyQuestion-CardBody" style={{ marginRight: "5px" }}>
        <div className="rounded container">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="justify-content-md-left">
              <Col md="12">
                <Form.Group className="textarea" controlId="validationCustom01">
                  <Form.Label>
                    <h4>Give an answer</h4>
                  </Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows="2"
                    disabled={!isloggedin}
                    placeholder="You know the answer, fill it in here!"
                    name="answercontent"
                    value={Answer.answercontent}
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
                  {" "}
                  <Button disabled={!isloggedin} type="submit" variant="light">
                    Answer Question
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default QuestionCreateAnwser;
