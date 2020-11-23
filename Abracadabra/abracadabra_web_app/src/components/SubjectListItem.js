import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function SubjectListItem() {
  return (
    <>
      <Col md={2} className="colOverFlow">
        <a href="#">
          <div className="divpartsubject">
            <h3>Subject title</h3>
            <p>Questions: 50K</p>
          </div>
        </a>
      </Col>
    </>
  );
}
