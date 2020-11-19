//react
import React from 'react';
import { csrfToken } from 'next-auth/client';
//bootstrap
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
//components
import BlankNavBar from 'src/components/BlankNavBar';

import {} from 'react-icons/fa'

export default function Login({ csrfToken }) {

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
                    <Form method="POST" action='/api/auth/callback/credentials'>
                        <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
                        <Form.Group controlId="username" className="mb-4">
                            <Form.Label className="font-weight-bold">Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name="username" />
                        </Form.Group>
                        <Form.Group controlId="password" className="mb-4">
                            <Form.Label className="font-weight-bold">Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" />
                        </Form.Group>
                        <Form.Group controlId="LoginButton" className="mb-4">
                           <Button type="submit" variant="info" className="btn-block">Login</Button>
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

Login.getInitialProps = async (context) => {
    return {
      csrfToken: await csrfToken(context)
    }
  }
