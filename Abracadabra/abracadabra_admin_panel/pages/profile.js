//react

//bootstrap
import { Container, Row, Col, Form, Button, Image} from 'react-bootstrap';
//components
import BlankNavBar from 'src/components/BlankNavBar';

import {} from 'react-icons/fa'

export default function Reports() {

  return (
    <>
        <BlankNavBar />
    <Container className="LoginContainer">
        <Row className="h-100 justify-content-center align-items-center">
            <Col xl={8} md={10} className="LoginArea rounded">
                <Row className="p-3">
                    <Col md={6} className="">
                    <Form>
                        <Form.Group controlId="Accountname" className="mb-4">
                            <Form.Label className="font-weight-bold">Accountname</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>
                        <Form.Group controlId="Email" className="mb-4">
                            <Form.Label className="font-weight-bold">E-mail</Form.Label>
                            <Form.Control type="email" placeholder="" />
                        </Form.Group>
                        <Form.Group controlId="Password" className="mb-4">
                            <Form.Label className="font-weight-bold">Password</Form.Label>
                            <Form.Control type="password" placeholder="" />
                        </Form.Group>
                    </Form>
                    </Col>
                    <Col className="mr-auto d-none d-sm-none d-md-block d-lg-block"></Col>
                    <Col  md={3} xs={6} className="mx-auto">
                        <Row className="mb-2">
                        <Col className="d-flex justify-content-center"><Image src="https://via.placeholder.com/150" height={130} className="my-auto mr-1" roundedCircle /></Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center p-0"><Button variant="info" className="" block>Change picture</Button></Col>
                        </Row>
                        
                    </Col>
                </Row>
                <Row className="p-3">
                    <Col md={3} className="p-0 ml-auto">
                        <Button variant="info" className="" block>Edit profile</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
    </>
  )
}
