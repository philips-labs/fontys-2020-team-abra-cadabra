import React, { useState, useEffect } from "react";
import { slice } from "__mocks__/fileMock";

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

  return (
    <div className="container mt-5">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        className="form-control"
        hidden //hidden because we are gonna build it in the navbar
      />
      {searchResults.map((question) => (
        <div className="card mt-1" key={question.id}>
          <div className="BodyQuestion-CardBody">

            <a href={subject + '/question/' + question.id}
              style={{ color: "black", fontWeight: "bold", fontSize: "25px" }}
            >
              {question.title}
            </a>
            <div className="d-flex row mr-auto">
              <div className="col-sm-8">
                <span className="badge badge-secondary p-1 mr-1">#Cutting</span>
                <span className="badge badge-secondary p-1 mr-1">
                  #Vegetables
                </span>
                <span className="badge badge-secondary p-1 mr-1">
                  #mise-en-place
                </span>
              </div>
              <div className="col-sm-4">
                <p>Question created on: {HumanDateTime(question.dateTimeCreated)}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Title;
