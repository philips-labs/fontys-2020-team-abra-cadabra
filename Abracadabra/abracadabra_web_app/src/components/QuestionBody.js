import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { slice } from "__mocks__/fileMock";

function Title({ question, subject, search, searchLength }) {
  const [message, setMessage] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(question);
    if (searchLength > 0) {
      setMessage("Results for: " + search);
    }
  }, []);

  function HumanDateTime(dateAndTime) {
    var date = new Date(dateAndTime);
    date = date.toUTCString().split(", ");
    date = date[1]?.slice(0, 17);

    return date;
  }

  function NrOfAnswers(numberOfAnswers) {
    if (numberOfAnswers == 1) {
      return numberOfAnswers + " person responded";
    } else {
      return numberOfAnswers + " people responded";
    }
  }

  if (questions.length > 0) {
    return (
      <div className="container BodyQuestion-Top">
        <h1>{message}</h1>
        {questions.map((q) => (
          <div key={q.id}>
            <div className="BoduQuestion-Total">
              <div className="BodyQuestion-CardBody">
                <div className='row'>
                  <div className="col-sm-9">
                    <a className="BodyQuestionText" href={'/subject/' + subject + '/question/' + q.id}>
                      <h4> {q.title} </h4>
                    </a>
                  </div>
                  <div className="col-sm-2">
                    {NrOfAnswers(q.numberOfAnswers)}
                  </div>
                </div>
              </div>
            </div>
            <div className="BodyQuestion-hastag">
              <div className="row">
                <div className="col-sm-9">
                </div>
                <div className="col-sm-3">
                  <p>Posted on: {HumanDateTime(q.dateTimeCreated)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (search != undefined) {
    return (
      <div className="container mt-5">
        <h1>No results for: {search}</h1>
      </div>
    );
  }
  else {
    return (
      <div className="container mt-5">
        <h1>No results for this filter</h1>
      </div>
    );
  }
}
export default Title;
