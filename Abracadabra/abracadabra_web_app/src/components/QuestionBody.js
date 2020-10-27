import React, { useState, useEffect } from "react";

function Title({question}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const results = question.filter((subjects) =>
      subjects.toLowerCase().includes(searchTerm)
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
      {searchResults.map((title) => (
        <div className="card mt-1" key={title}>
          <div className="BodyQuestion-CardBody">
            <a 
              href={title}
              style={{ color: "black", fontWeight: "bold", fontSize: "25px" }}
            >
              {title}
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
                <p>Last modified by user: 10 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Title;
