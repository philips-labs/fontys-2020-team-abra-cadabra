import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function SubjectListItem({name}) {
  return (
    <>
      <Col md={2} className="colOverFlow">
        <a href={"/subject/" + name}>
          <div className="divpartsubject">
            <h3>{name}</h3>
            <p>Questions: 50K</p>
          </div>
        </a>
      </Col>
    </>
  );
}
