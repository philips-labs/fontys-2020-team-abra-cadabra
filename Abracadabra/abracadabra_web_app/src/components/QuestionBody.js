import React, { useState, useEffect } from "react";

function Title({ question, subject, search, searchLength }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (searchLength > 0) {
      setMessage("Results for: " + search);
    }
  }, []);

  if (question.length > 0) {
    return (
      <div className="container mt-5">
        <h1>{message}</h1>
        {question.map((question) => (
          <div className="card mt-1" key={question.id}>
            <div className="BodyQuestion-CardBody">
              <a
                href={
                  "/subject/" +
                  subject +
                  "/question/" +
                  question.id
                }
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                {question.title}
              </a>
              <div className="d-flex row mr-auto">
                <div className="col-sm-8">
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
                <div className="col-sm-4">
                  <p>Question created on: {question.dateTimeCreated}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="container mt-5">
        <h1>No results for: {search}</h1>
      </div>
    );
  }
}

export default Title;
