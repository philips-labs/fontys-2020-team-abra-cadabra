
import { Container, Row, Col, Nav, NavItem, NavLink, Navbar } from 'react-bootstrap';
//components
import NavBar from 'src/components/NavBar';
import {FaHome, FaUserGraduate, FaFlag, FaChartBar, FaUsers, FaNewspaper} from 'react-icons/fa'

export default function Dashboard() {
  return (
    <>
      <NavBar />
      
      <Container fluid className="">
        {/* Sidebar hidden on mobile, and put into the NavBar */}
        <Row className="d-none d-sm-none d-md-block d-lg-block">
          <Col md={3} xl={2} className="pl-0 pr-0">
            <Nav id="sidebarMenu" className="flex-column Default-Sidebar">
                <Nav className="">
                  {/* a is used for the */}

                  {/* Dashboard */}
                  <a href="/" className="w-100">
                  <Row className="w-100 m-0 p-2 border-bottom">
                  <FaHome className="my-auto ml-2 Nav-color"/>
                  <p className="Nav-color p-2 my-auto">
                     Dashboard
                    </p>
                    </Row>
                  </a>

                  {/* Expert verification */}
                  <a href="/expertverification" className="w-100">
                    <Row className="w-100 m-0 p-2 border-bottom">
                  <FaUserGraduate className="my-auto ml-2 Nav-color"/>
                    <p className="Nav-color p-2 my-auto">
                     Expert verification
                    </p>
                    </Row>
                    </a>
                    {/* Reports */}
                    <a href="/reports" className="w-100">
                    <Row className="w-100 m-0 p-2 border-bottom">
                  <FaFlag className="my-auto ml-2 Nav-color"/>
                    <p href="#" className="Nav-color p-2 my-auto">
                    Reports
                    </p>
                    </Row>
                    </a>

                  {/* Detailed statistics */}
                    <a href="/statistics" className="w-100">
                    <Row className="w-100 m-0 p-2 border-bottom">
                  <FaChartBar className="my-auto ml-2 Nav-color"/>
                  <p href="#" className="Nav-color p-2 my-auto">
                     Detailed statistics
                    </p>
                    </Row>
                    </a>
                    {/* User management */}
                    <a href="/usermanagement" className="w-100">
                    <Row className="w-100 m-0 p-2 border-bottom">
                  <FaUsers className="my-auto ml-2 Nav-color"/>
                  <p href="#" className="Nav-color p-2 my-auto">
                     User management
                    </p>
                    </Row>
                    </a>

                    {/* Subject management */}
                    <a href="/subjectmanagement" className="w-100">
                    <Row className="w-100 m-0 p-2 border-bottom">
                  <FaNewspaper className="my-auto ml-2 Nav-color"/>
                  <p href="#" className="Nav-color p-2 my-auto">
                     Subject management
                    </p>
                    </Row>   
                    </a>
                </Nav>
            </Nav>
          </Col>
        </Row>
      </Container>
    </>
  )
}
