import { Card, Row, Col } from 'react-bootstrap';


export default function Answer({ answer }) {

    function HumanDateTime(dateAndTime) {
        var date = new Date(dateAndTime + "Z");
        date = date.toUTCString().split(", ");
        date = date[1].slice(0, 17);

        return date;
    }

    return (
        <>
            <Row className="border-bottom mb-3">
                <Col md={11} className="mx-auto">

                    <Card className="answerBody">
                        <Card.Body>
                            <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="answerFooter">
                            <div className="d-flex">
                                <img className="questionPageAvatar" src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"></img>
                                <p className="answerUsername">{answer.userName}</p>
                            </div>
                            <p className="answerPosted">Posted on: {HumanDateTime(answer.dateTimeCreated)}</p>
                        </Card.Footer>
                    </Card>


                    {/* Answer header */}
                    {/* <Row>
                        <Col md={1}>
                            <img className="questionPageAvatar" src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"></img>
                        </Col>
                        <Col md={7}>
                            <h6 className="font-weight-bold">{answer.userName}</h6>

                        </Col>
                        <Col md={4}>
                            <h6 className="font-weight-bold helpedText">Has Helped: <span>100</span> People</h6>
                        </Col>
                    </Row> */}
                    {/* Answer content */}
                    {/* <Row>
                        <Col md={1}></Col>
                        <Col>
                            <p className="answerContentText">{answer.answerContent}</p>
                        </Col>
                    </Row> */}
                </Col>
            </Row>
        </>
    );

}