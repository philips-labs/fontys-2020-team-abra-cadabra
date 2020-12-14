import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Row, Col } from "react-bootstrap";
import {
  faChartLine,
  faFireAlt,
  faCertificate,
  faComment,
  faCommentSlash,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FilterButtons({ subjectTitle }) {
  const router = useRouter();
  let route = router.asPath.split("/")[3];

  return (
    <div className="rounded container">
      <Row>
        <Col md="5">
          <Button
            variant="secondary"
            className={route == "/trending" ? "btnSmall active mr-2" : "btnSmall mr-2"}
            href={"/subject/" + subjectTitle + "/trending"}
          >
            <FontAwesomeIcon icon={faFireAlt} /> Hot
          </Button>
          <Button
            variant="secondary"
            className={route == undefined ? "btnSmall active mr-2" : "btnSmall mr-2"}
            href={"/subject/" + subjectTitle + "/"}
          >
            <FontAwesomeIcon icon={faCertificate} /> New
          </Button>
        </Col>
        <Col md="7" className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className={route == "unanswered" ? "btnBig active mr-2" : "btnBig mr-2"}
            href={"/subject/" + subjectTitle + "/unanswered"}
          >
            <FontAwesomeIcon icon={faCommentSlash} /> Unanswered
          </Button>
          <Button
            variant="secondary"
            className={route == "answered" ? "btnBig active mr-2" : "btnBig mr-2"}
          >
            <FontAwesomeIcon icon={faComment} /> Answered
          </Button>
          <Button
            variant="secondary"
            className={route == "expert" ? "btnBig active" : "btnBig"}
            href={'/subject/' + subjectTitle + '/expert'}
          >
            <FontAwesomeIcon icon={faUserGraduate} /> Expert Answered
          </Button>
        </Col>
      </Row>
    </div>
  );
}
export default FilterButtons;
