import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { faChartLine, faFireAlt, faCertificate, faComment, faCommentSlash, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function FilterButtons({ subjectTitle }) {
    return (
        <div class="rounded container">
            <Row>
                <Col md="7">
                    <Button variant="secondary" className="btnSmall" href={'/subject/' + subjectTitle + '/new'}><FontAwesomeIcon icon={faCertificate} /> New</Button>
                    <Button variant="secondary" className="btnSmall" href={'/subject/' + subjectTitle + "/trending"}><FontAwesomeIcon icon={faFireAlt} /> Trending</Button>
                    <Button variant="secondary" className="btnSmall" ><FontAwesomeIcon icon={faChartLine} /> Top</Button>
                </Col>
                <Col md="5">
                    <Button variant="secondary" className="btnBig" href={'/subject/' + subjectTitle + '/unanswered'}><FontAwesomeIcon icon={faCommentSlash} /> Unanswered</Button>
                    <Button variant="secondary" className="btnBig"><FontAwesomeIcon icon={faComment} /> Answered</Button>
                    <Button variant="secondary" className="btnBig"><FontAwesomeIcon icon={faUserGraduate} /> Expert Answered</Button>
                </Col>
            </Row>
        </div>
    )
}
export default FilterButtons;