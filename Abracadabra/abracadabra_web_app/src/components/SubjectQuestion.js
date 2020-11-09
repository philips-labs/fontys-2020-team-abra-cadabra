import {Container, Row, Col} from 'react-bootstrap';


export default function Question({question}) {

    return (
        <>
            <div className="mx-auto questionHead">
            <div className="answerHead mx-auto">
                <h1>Q</h1>
                <Row>
                 <Col md={10} className="mx-auto">                 
                   <Row>
                     <Col md={9}>
                     <h3>{question.title}</h3>
                     </Col>
                     <Col md={3} className="d-flex justify-content-end">
                        <img className="questionAvatar" src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"></img>
                        <p className="questionUsername">{question.userName}</p>
                     </Col>
                  </Row>
                  <Row className="">
                          <Col>
                          <p>{question.description}</p>
                          </Col>
                   
                </Row>
                 </Col>
                </Row>
                </div>
                <div className="row justify-content-end">
                    <button className="questionButton">Submit Own Answer</button>
                </div>
            </div>
        </>
    );

}