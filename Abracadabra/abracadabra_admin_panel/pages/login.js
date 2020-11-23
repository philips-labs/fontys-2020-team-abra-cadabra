//react
import React from 'react';
import { csrfToken } from 'next-auth/client';
import { useRouter } from 'next/router';
//bootstrap
import { Container, Row, Col, Form, Button, Alert} from 'react-bootstrap';
//components
import BlankNavBar from 'src/components/BlankNavBar';

import {} from 'react-icons/fa'

export default function Login({ csrfToken }) {

    const router = useRouter();
    const {error} = router.query;
    let erroralert = null;

    if(error)
    {
       erroralert = 
       <Col md={8} className="mx-auto my-auto text-center">  
            <Alert variant={"danger"}>
            {error}
            </Alert>
        </Col>;    
    }
    else {
        erroralert = null;
    }



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
                        <Form.Group controlId="email" className="mb-4">
                            <Form.Label className="font-weight-bold">Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name="email" />
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
                <Row>
                    {erroralert}
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
