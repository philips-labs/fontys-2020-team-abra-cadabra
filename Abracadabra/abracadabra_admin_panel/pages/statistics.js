//react
import React from 'react';
import {useEffect} from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
//bootstrap
import { Container, Row, Col } from 'react-bootstrap';
//components
import NavBar from 'src/components/NavBar';
import SideBar from 'src/components/SideBar'
import {} from 'react-icons/fa'

export default function Statistics() {
  const [ session, loading ] = useSession();

  if (loading) return null

  if (!loading && !session) signIn('Credentials')

  if (!loading && session) {
    localStorage.setItem("AdminToken", session.user.image);
return (
    <>
    <NavBar/>
    <Container fluid className="h-100">
    <Row className="h-100">
      {/* Sidebar col xl={2} md={3} */}
      <SideBar />
      </Row>
      </Container>
    </>
  )
  }
}
