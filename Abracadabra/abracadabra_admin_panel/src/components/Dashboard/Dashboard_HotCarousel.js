//react

//bootstrap
import { Row, Col, Carousel } from 'react-bootstrap';

export default function Dashboard_HotCarousel({ Username }) {

    return (
        <>

            <Col className="p-0">
                <Carousel className="h-100 HotCarousel">

                    <Carousel.Item interval={3000} className="h-100">
                        <div className="d-block w-100 h-100 bg-secondary">
                            <Row><Col md={12} className="pb-3"></Col></Row>
                            <Row className="pt-1">
                                <Col md={4} xs={4}></Col><Col><p className="CarouselQuestions">this is a title of a subject question?</p></Col> <Col md={2} xs={2}></Col>
                            </Row>
                            <Row className="">
                                <Col md={5} xs={5}></Col><Col><p className="CarouselQuestions">this is a title of a subject question?</p></Col> <Col md={2} xs={2}></Col>
                            </Row>
                            <Row className="">
                                <Col md={2} xs={2}></Col><Col><p className="CarouselQuestions">this is a title of a subject question?</p></Col> <Col md={4} xs={4}></Col>
                            </Row>
                        </div>
                        <Carousel.Caption>
                            <h6 className="mb-0">Subject</h6>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item interval={3000} className="h-100">
                        <div className="d-block w-100 h-100 bg-secondary">
                            <Row><Col md={12} xs={12} className="pb-3"></Col></Row>
                            <Row className="pt-1">
                                <Col md={2} xs={2}></Col><Col><p className="CarouselQuestions">this is a title of a subject question?</p></Col> <Col md={5} xs={2}></Col>
                            </Row>
                            <Row className="">
                                <Col md={3} xs={3}></Col><Col><p className="CarouselQuestions">this is a title of a subject question?</p></Col> <Col md={2} xs={2}></Col>
                            </Row>
                            <Row className="">
                                <Col md={5} xs={5}></Col><Col><p className="CarouselQuestions">this is a title of a subject question?</p></Col> <Col md={2} xs={2}></Col>
                            </Row>
                        </div>
                        <Carousel.Caption>
                            <h6 className="mb-0">Gaming</h6>
                            <p>Ask questions about gaming.</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item className="h-100">
                        <div className="d-block w-100 h-100 bg-secondary">
                            <Row><Col md={12} xs={12} className="pb-3"></Col></Row>
                            <Row className="pt-1">
                                <Col md={2} xs={2}></Col><Col><p className="CarouselQuestions">this is a title of a subject question?</p></Col> <Col md={2} xs={2}></Col>
                            </Row>
                            <Row className="">
                                <Col md={5} xs={5}></Col><Col><p className="CarouselQuestions">this is a title of a subject question?</p></Col> <Col md={2} xs={2}></Col>
                            </Row>
                            <Row className="">
                                <Col md={2} xs={2}></Col><Col><p className="CarouselQuestions">this is a title of a subject question?</p></Col> <Col md={5} xs={5}></Col>
                            </Row>
                        </div>
                        <Carousel.Caption>
                            <h6 className="mb-0">Cooking</h6>
                            <p>Ask questions about cooking and share your recipes.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Col>

        </>
    );
}