import { Container, Row, Col, Button } from "react-bootstrap";
export default function Question({ question }) {
  //   function HumanDateTime(dateAndTime) {
  //     var date = new Date(dateAndTime + "Z");
  //     date = date.toUTCString().split(", ");
  //     date = date[1].slice(0, 17);

  //     return date;
  //   }
  return (
    <>
      <div className="container mt-5">
        <h1>Q</h1>
        <div className="border-top">
          <Row className="mt-3 mb-3">
            <Col md={10} className="mx-auto">
              <Row>
                <Col md={9}>
                  <h3>{question.title}</h3>
                </Col>
                <Col md={3} className="d-flex justify-content-end">
                  <img
                    className="questionAvatar rounded-circle mr-1"
                    style={{ height: "40px" }}
                    src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"
                  ></img>
                  <p className="questionUsername">{question.userName}</p>
                  {/* <p>{HumanDateTime(question.dateTimeCreated)}</p> */}
                </Col>
              </Row>
              <Row className="">
                <Col>
                  <p>{question.description}</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="row justify-content-end" hidden>
            <Button variant="secondary" className="btn-primary">
              Submit Own Answer
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
