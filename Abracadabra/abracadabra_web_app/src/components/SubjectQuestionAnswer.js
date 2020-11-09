import {Container, Row, Col} from 'react-bootstrap';


export default function Answer({answer}) {

    return (
        <>
            <Row className="border-bottom mb-3">
                <Col md={10} className="mx-auto">
                    {/* Answer header */}
                    <Row>
                        <Col md={1}>
                            <img className="questionAvatar" src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"></img>
                        </Col>
                        <Col md={7}>
                            <h6 className="font-weight-bold">{answer.userName}</h6>

                        </Col>
                        <Col md={4}>
                            <h6 className="font-weight-bold helpedText">Has Helped: <span>100</span> People</h6>
                        </Col>
                    </Row>
                    {/* Answer content */}
                    <Row>
                        <Col md={1}></Col>
                        <Col>
                            <p className="answerContentText">{answer.answerContent}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );

}