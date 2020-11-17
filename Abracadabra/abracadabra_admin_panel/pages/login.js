//react

//bootstrap
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
//components
import BlankNavBar from 'src/components/BlankNavBar';

import {} from 'react-icons/fa'

export default function Reports() {

  return (
    <>
        <BlankNavBar />
    <Container className="LoginContainer">
        <Row className="h-100 justify-content-center align-items-center">
            <Col xl={6} md={8} className="LoginArea pb-3 rounded">
                <Row className="mb-4 p-3">
                    <Col className="pl-0">
                        <h4 className="font-weight-bold">Login</h4>
                    </Col>
                    <Col md={8} xs={6} className="text-right">
                    <a className="LoginLink">Don't have an account? Register!</a>
                    </Col>
                </Row>
                <Row className="justify-content-center mb-2">
                    <Col md={8}>
                    <Form>
                        <Form.Group controlId="Accountname" className="mb-4">
                            <Form.Label className="font-weight-bold">Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="Password" className="mb-4">
                            <Form.Label className="font-weight-bold">Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="LoginButton" className="mb-4">
                           <Button variant="info" className="btn-block">Login</Button>
                        </Form.Group>
                    </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
    </>
  )
}
