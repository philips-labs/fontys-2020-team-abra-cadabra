import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
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
    var date = new Date(dateAndTime + "Z");
    date = date.toUTCString().split(", ");
    date = date[1].slice(0, 17);

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
                  <div className="col-sm-10">
                    <a className="BodyQuestionText" href={'/subject/' + subject + '/question/' + q.id}>
                      <h4> {q.title} </h4>
                    </a>
                  </div>
                  <div className="col-sm-2">
                    <div className="d-flex flex-column">
                      {NrOfAnswers(q.numberOfAnswers)}
                      {q.isAnsweredByExpert ?
                        <OverlayTrigger
                          placement='bottom'
                          overlay={
                            <Tooltip>
                              Answered by an Expert
                            </Tooltip>
                          }
                        >
                          <FontAwesomeIcon className="questionExpertTick" icon={faCheck} />
                        </OverlayTrigger>
                        : <></>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="BodyQuestion-hastag">
              <div className="row">
                <div className="col-sm-9">
                  <span className="badge badge-info p-1 mr-1">#Cutting</span>
                  <span className="badge badge-info p-1 mr-1">#Vegetables</span>
                  <span className="badge badge-info p-1 mr-1">
                    #mise-en-place
                  </span>
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
        <h1>No Questions with that Filter</h1>
      </div>
    );
  }
}
export default Title;
