import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Row, Col } from 'react-bootstrap';
import { faChartLine, faFireAlt, faCertificate, faComment, faCommentSlash, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function FilterButtons({ subjectTitle }) {
    const router = useRouter();
    let route = router.asPath.split("/")[3];
    // console.log(route);

    return (
        <div className="rounded container">
            <Row>
                <Col md="7">
                    <Button variant="secondary" className={route == undefined ? "btnSmall active" : "btnSmall"} href={'/subject/' + subjectTitle}><FontAwesomeIcon icon={faFireAlt} /> Hot</Button>
                    <Button variant="secondary" className={route == "new" ? "btnSmall active" : "btnSmall"} href={'/subject/' + subjectTitle + '/new'}><FontAwesomeIcon icon={faCertificate} /> New</Button>
                    <Button variant="secondary" className={route == "top" ? "btnSmall active" : "btnSmall"} href={'/subject/' + subjectTitle + '/top'}><FontAwesomeIcon icon={faChartLine} /> Top</Button>
                </Col>
                <Col md="5">
                    <Button variant="secondary" className={route == "unanswered" ? "btnBig active" : "btnBig"} href={'/subject/' + subjectTitle + '/unanswered'}><FontAwesomeIcon icon={faCommentSlash} /> Unanswered</Button>
                    <Button variant="secondary" className={route == "answered" ? "btnBig active" : "btnBig"}><FontAwesomeIcon icon={faComment} /> Answered</Button>
                    <Button variant="secondary" className={route == "expertAnswered" ? "btnBig active" : "btnBig"}><FontAwesomeIcon icon={faUserGraduate} /> Expert Answered</Button>
                </Col>
            </Row>
        </div>
    )
}
export default FilterButtons;