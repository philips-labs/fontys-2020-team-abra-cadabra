import React, { useState, useEffect } from "react";
import { slice } from "__mocks__/fileMock";

function Title({ question, subject, search, searchLength }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (searchLength > 0) {
      setMessage("Results for: " + search);
    }
  }, []);

  function HumanDateTime(dateAndTime) {
    var date = new Date(dateAndTime + "Z");
    date = date.toUTCString().split(", ");
    date = date[1].slice(0, 17);

    return (date);
  }

  function NrOfAnswers(numberOfAnswers) {
    if (numberOfAnswers == 1) {
      return numberOfAnswers + " person responded";
    }
    else {
      return numberOfAnswers + " people responded";
    }
  }

  if (question.length > 0) {
    return (
      <div className="container mt-5">
        <h1>{message}</h1>
        {question.map((question) => (
          <div key={question.id}>
            <div className="BoduQuestion-Total">
              <div className="BodyQuestion-CardBody">
                <div className='row'>
                  <div className="col-sm-10">
                    <a className="BodyQuestionText" href={'/subject/' + subject + '/question/' + question.id}
                    >
                      <h4> {question.title} </h4>
                    </a>
                  </div>
                  <div className="col-sm-2">
                    {NrOfAnswers(question.numberOfAnswers)}
                  </div>
                </div>
              </div>
            </div>
            <div className="BodyQuestion-hastag">
              <div className="row">
                <div className="col-sm-9">
                  <span className="badge badge-info p-1 mr-1">#Cutting</span>
                  <span className="badge badge-info p-1 mr-1">
                    #Vegetables
                </span>
                  <span className="badge badge-info p-1 mr-1">
                    #mise-en-place
                </span>
                </div>
                <div className="col-sm-3">
                  <p>Posted on: {HumanDateTime(question.dateTimeCreated)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else if ({ search } != undefined) {
    return (
      <div className="container mt-5">
        <h1>No results for: {search}</h1>
      </div>
    );
  }
  else {
    return (
      <div className="container mt-5">
        <h1>Pepega</h1>
      </div>
    );
  }
}

export default Title;
