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
        <div key={question.id}>
          <div className="BodyQuestion-CardBody">
            <div className='row'>
              <div className="col-sm-10">
                <a className="BodyQuestionText" href={subject + '/question/' + question.id}
                >
                  <h4> {question.title} </h4>
                </a>
              </div>
              <div className="col-sm-2">
                25 people responded
             </div>
            </div>
          </div>
          <div className="BodyQuestion-hastag">
            <div className="row">
              <div className="col-sm-9">
                <span className="badge badge-secondary p-1 mr-1">#Cutting</span>
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Title;
