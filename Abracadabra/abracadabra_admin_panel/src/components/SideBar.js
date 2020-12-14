//react
import {useRouter} from 'next/router';
import Link from 'next/link';
//bootstrap
import { Container, Row, Col, Nav, NavItem, NavLink, Navbar } from 'react-bootstrap';
//components
import NavBar from 'src/components/NavBar';
import {FaHome, FaUserGraduate, FaFlag, FaChartBar, FaUsers, FaNewspaper} from 'react-icons/fa';

export default function Dashboard() {

const router = useRouter();

  return (
    <>
{/* Sidebar hidden on mobile, and put into the NavBar */}
{/* <Row className=""> */}
          <Col md={3} xl={2} className="pl-0 pr-0 d-none d-sm-none d-lg-block">
            <Nav id="sidebarMenu" className="flex-column Default-Sidebar">
                <Nav className="">
                  {/* a is used for the */}

                  {/* Dashboard */}
                  <Link href="/"><a className="w-100 wrap">
                  <Row className={router.pathname == "/" ? "active w-100 m-0 p-2 border-bottom" : "w-100 m-0 p-2 border-bottom"}>
                  <FaHome className="my-auto ml-2 Nav-color"/>
                  <p className="Nav-color p-2 my-auto">
                     Dashboard
                    </p>
                    </Row>
                  </a></Link>

                  {/* Expert verification */}
                  <Link href="/expertverification"><a className="w-100 wrap">
                    <Row className={router.pathname == "/expertverification" ? "active w-100 m-0 p-2 border-bottom" : "w-100 m-0 p-2 border-bottom"}>
                  <FaUserGraduate className="my-auto ml-2 Nav-color"/>
                    <p className="Nav-color p-2 my-auto">
                     Expert verification
                    </p>
                    </Row>
                    </a></Link>

                    {/* Reports */}
                    <Link href="/reports"><a className="w-100 wrap">
                    <Row className={router.pathname == "/reports" ? "active w-100 m-0 p-2 border-bottom" : "w-100 m-0 p-2 border-bottom"}>
                  <FaFlag className="my-auto ml-2 Nav-color"/>
                    <p href="#" className="Nav-color p-2 my-auto">
                    Reports
                    </p>
                    </Row>
                    </a></Link>

                  {/* Detailed statistics */}
                    {/* <Link href="/statistics"><a className="w-100 wrap">
                    <Row className={router.pathname == "/statistics" ? "active w-100 m-0 p-2 border-bottom" : "w-100 m-0 p-2 border-bottom"}>
                  <FaChartBar className="my-auto ml-2 Nav-color"/>
                  <p href="#" className="Nav-color p-2 my-auto">
                     Detailed statistics
                    </p>
                    </Row>
                    </a></Link> */}

                    {/* User management */}
                    <Link href="/usermanagement"><a className="w-100 wrap">
                    <Row className={router.pathname == "/usermanagement" ? "active w-100 m-0 p-2 border-bottom" : "w-100 m-0 p-2 border-bottom"}>
                  <FaUsers className="my-auto ml-2 Nav-color"/>
                  <p href="#" className="Nav-color p-2 my-auto">
                     User management
                    </p>
                    </Row>
                    </a></Link>

                    {/* Subject management */}
                    {/* <Link href="/subjectmanagement"><a className="w-100 wrap">
                    <Row className={router.pathname == "/subjectmanagement" ? "active w-100 m-0 p-2 border-bottom" : "w-100 m-0 p-2 border-bottom"}>
                  <FaNewspaper className="my-auto ml-2 Nav-color"/>
                  <p href="#" className="Nav-color p-2 my-auto">
                     Subject management
                    </p>
                    </Row>   
                    </a></Link> */}
                </Nav>
            </Nav>
          </Col>
        {/* </Row> */}
    </>
  )
}