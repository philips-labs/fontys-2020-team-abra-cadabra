import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faFlag } from '@fortawesome/free-solid-svg-icons';


export default function Question({ question }) {

    return (
        <>
            <div className="questionHead mx-auto">
                <div className="questionHeadDiv">
                    <h1>Q</h1>
                    <FontAwesomeIcon className="flagIcon" icon={faFlag} />
                </div>
                <Row>
                    <Col md={11} className="mx-auto">
                        <Row>
                            <Col md={9}>
                                <h3>{question.title}</h3>
                            </Col>
                            <Col md={3} className="d-flex justify-content-end">
                                <img className="questionPageAvatar" src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"></img>
                                <p className="questionUsername">{question.userName}</p>
                            </Col>
                        </Row>
                        <Row className="ml-1">
                            <Col md={9}>
                                <p>{question.description}</p>
                            </Col>
                            <Col md={3} className="text-right">
                                <p>Posted on: {question.dateTimeCreated}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    );

}
