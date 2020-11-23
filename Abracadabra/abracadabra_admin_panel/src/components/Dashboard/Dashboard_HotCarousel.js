//react

//bootstrap
import { Row, Col, Carousel } from 'react-bootstrap';

export default function Dashboard_HotCarousel({ Subject1, Subject2, Subject3 }) {

    return (
        <>

            <Col className="p-0">
                <Carousel className="h-100 HotCarousel">

                    <Carousel.Item interval={3000} className="h-100">
                        <div className="d-block w-100 h-100 bg-secondary">
                            <Row><Col md={12} className="pb-3"></Col></Row>
                            <Row className="pt-1">
                                <Col md={4} xs={4}></Col><Col><p className="CarouselQuestions">{Subject1?.questionTitles[0]}</p></Col> <Col md={2} xs={2}></Col>
                            </Row>
                            <Row className="">
                                <Col md={5} xs={5}></Col><Col><p className="CarouselQuestions">{Subject1?.questionTitles[1]}</p></Col> <Col md={2} xs={2}></Col>
                            </Row>
                            <Row className="">
                                <Col md={2} xs={2}></Col><Col><p className="CarouselQuestions">{Subject1?.questionTitles[2]}</p></Col> <Col md={2} xs={2}></Col>
                            </Row>
                        </div>
                        <Carousel.Caption>
                            <h6 className="mb-0">{Subject1?.subjectName}</h6>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item interval={3000} className="h-100">
                        <div className="d-block w-100 h-100 bg-secondary">
                            <Row><Col md={12} xs={12} className="pb-3"></Col></Row>
                            <Row className="pt-1">
                                <Col md={2} xs={2}></Col><Col><p className="CarouselQuestions">{Subject2?.questionTitles[0]}</p></Col> <Col md={5} xs={2}></Col>
                            </Row>
                            <Row className="">
                                <Col md={3} xs={3}></Col><Col><p className="CarouselQuestions">{Subject2?.questionTitles[1]}</p></Col> <Col md={2} xs={2}></Col>
                            </Row>
                            <Row className="">
                                <Col md={5} xs={5}></Col><Col><p className="CarouselQuestions">{Subject2?.questionTitles[2]}</p></Col> <Col md={2} xs={2}></Col>
                            </Row>
                        </div>
                        <Carousel.Caption>
                            <h6 className="mb-0">{Subject2?.subjectName}</h6>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item className="h-100">
                        <div className="d-block w-100 h-100 bg-secondary">
                            <Row><Col md={12} xs={12} className="pb-3"></Col></Row>
                            <Row className="pt-1">
                                <Col md={2} xs={2}></Col><Col><p className="CarouselQuestions">{Subject3?.questionTitles[0]}</p></Col> <Col md={2} xs={2}></Col>
                            </Row>
                            <Row className="">
                                <Col md={5} xs={5}></Col><Col><p className="CarouselQuestions">{Subject3?.questionTitles[1]}</p></Col> <Col md={2} xs={2}></Col>
                            </Row>
                            <Row className="">
                                <Col md={2} xs={2}></Col><Col><p className="CarouselQuestions">{Subject3?.questionTitles[2]}</p></Col> <Col md={5} xs={5}></Col>
                            </Row>
                        </div>
                        <Carousel.Caption>
                            <h6 className="mb-0">{Subject3?.subjectName}</h6>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Col>

        </>
    );
}