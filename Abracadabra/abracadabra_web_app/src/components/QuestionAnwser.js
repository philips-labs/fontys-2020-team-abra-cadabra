import React from "react";
import { Container, Row, Col, Image, Figure } from "react-bootstrap";
import Question from "./QuestionHead";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

function QuestionAnwser() {
  return (
    <div class="rounded container">
      <Row className="justify-content-md-left">
        <Col md="1">
          <b>
            <h2>A</h2>
          </b>
        </Col>
      </Row>
      <br />
      <Row className="justify-content-md-left">
        <Col md="1">
          <Figure.Image width={171} height={180} src="//placehold.it/150" />
        </Col>
        <Col md="2">
          <b>
            <h7>Berry Responder</h7>
          </b>
          <Figure.Image width={30} height={30} src="//placehold.it/30" />
        </Col>
        <Col md="8">
          <h7>Has helped: 20 People</h7>
        </Col>
        <Col md="1">
          <FontAwesomeIcon icon={faCaretUp} size="3x" />
          <br />
          <FontAwesomeIcon icon={faCaretDown} size="3x" />
        </Col>
      </Row>
      <Row className="justify-content-md-left">
        <h8>
          1. CUT THE ONION IN HALF: To chop or mince an onion, first halve the
          onion pole to pole then lay each half cut side down on the cutting
          board. Lop off the tops of each half and trim the root end, being
          careful not to remove too much of the onion.
          <br />
          2. MAKE SEVERAL CUTS: Peel the onion, then make several horizontal
          cuts from one end of the onion half almost to the other, but don’t cut
          all the way through the root end. The number of cuts will depend on
          the size of the onion and the desired size of the chop or dice. For
          minced onion, make closer cuts; for chopped onion, space the cuts
          further apart.
        </h8>
      </Row>
      <hr />
    </div>
  );
}
export default QuestionAnwser;
