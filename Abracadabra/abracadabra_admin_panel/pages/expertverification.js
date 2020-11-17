
//react

//bootstrap
import { Container, Row, Col, Nav, NavItem, NavLink, Navbar } from 'react-bootstrap';
//components
import NavBar from 'src/components/NavBar';
import SideBar from 'src/components/SideBar'
import {} from 'react-icons/fa'

export default function Expertverification() {

  return (
    <>
      <NavBar />
      
      <Container fluid className="">
        <SideBar />
      </Container>
    </>
  )
}
