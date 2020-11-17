import { Container, Row, Col } from "react-bootstrap";

export default function Answer({ answer }) {
  return (
    <>
      <div className="container mt-5">
        <div key={answer.id} style={{ marginRight: "5px" }}>
          <div className="BodyQuestion-Total">
            <div className="BodyQuestion-CardBody">
              <Row>
                <Col md={10}>
                  <p>
                    {" "}
                    {answer.answerContent} Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Aenean sed lacus eget tortor
                    rutrum malesuada. Cras finibus volutpat dui, nec tempus
                    magna commodo eu. Maecenas rutrum magna quam, et lacinia
                    odio rhoncus id. Sed est ipsum, condimentum vitae finibus
                    eget, pulvinar id sapien. Fusce eu pharetra odio, non congue
                    neque. Sed consequat diam quis enim facilisis semper. Mauris
                    auctor nisl nec lectus cursus porttitor. Nullam in commodo
                    eros.{" "}
                  </p>
                </Col>
                <Col md={1}></Col>
                <Col md={1}>
                  <div>
                    ▲<p>100</p>▼
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className="BodyQuestion-hastag">
            <Row>
              <Col md={10}>
                <h6 className="font-weight-bold">
                  <img
                    className="questionAvatar rounded-circle mb-2 mr-1"
                    style={{ height: "40px" }}
                    src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"
                  ></img>
                  {answer.userName}
                </h6>
              </Col>
              <Col>
                <p className="mt-2">Posted on: 10-11-22</p>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}
