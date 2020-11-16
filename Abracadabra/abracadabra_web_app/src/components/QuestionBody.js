import React, { useState, useEffect } from "react";

function Title({ question, subject }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = question.filter((question) =>
      question.title.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

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

  return (
    <div className="container mt-5">
      {searchResults.map((question) => (
        <div key={question.id}>
          <div className="BoduQuestion-Total">
            <div className="BodyQuestion-CardBody">
              <div className="row">
                <div className="col-sm-10">
<<<<<<< HEAD
                  <a
                    className="BodyQuestionText"
                    href={subject + "/question/" + question.id}
=======
                  <a className="BodyQuestionText" href={'/subject/' + subject + '/question/' + question.id}
>>>>>>> 598ad2e22f8150ceb8e19c6a8b8d4ac6d40ee6a5
                  >
                    <h4> {question.title} </h4>
                  </a>
                </div>
<<<<<<< HEAD
                <div className="col-sm-2">25 people responded</div>
              </div>
            </div>
            <div className="BodyQuestion-hastag">
              <div className="row">
                <div className="col-sm-9">
                  <span className="badge badge-secondary p-1 mr-1">
                    #Cutting
                  </span>
                  <span className="badge badge-secondary p-1 mr-1">
                    #Vegetables
                  </span>
                  <span className="badge badge-secondary p-1 mr-1">
                    #mise-en-place
                  </span>
                </div>
                <div className="col-sm-3">
                  <p>Posted on: {question.dateTimeCreated}</p>
                </div>
=======
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
>>>>>>> 598ad2e22f8150ceb8e19c6a8b8d4ac6d40ee6a5
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Title;