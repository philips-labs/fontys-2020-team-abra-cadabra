//import react-bootstrap navbar parts 
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
//import react bootstrap
import {Image, Row, FormControl, InputGroup,Button} from 'react-bootstrap';
//nextjs router hook
import { useRouter } from "next/router";
//import image
import Logo from 'public/images/Abra_Logo_Centered.png';
import {FaHome, FaUserGraduate, FaFlag, FaChartBar, FaUsers, FaNewspaper} from 'react-icons/fa'

export default function NavBar() {

    const router = useRouter();

    return (
            <Navbar collapseOnSelect expand="lg" variant="dark" className="Default-Navbar">
                <Navbar.Brand href="/" className="p-0 d-flex">   
                    <Image src={Logo} height={60} className="my-auto"/>
                    <h5 className="my-auto">Abracadabra Admin Panel</h5>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                    <Row>
                    <Nav.Link href="#" className="ml-3 my-auto mr-2">
                        Username
                    </Nav.Link>
                    </Row>
                    </Nav>
                    <Nav className="d-block d-sm-block d-lg-none">
                    <Row>
                    <FaHome className="ml-3 my-auto mr-2"/>
                    <Nav.Link href="#" className="Nav-color">
                        Dashboard
                    </Nav.Link>
                    </Row>
                    <Row>
                    <FaUserGraduate className="ml-3 my-auto mr-2"/>
                    <Nav.Link href="#" className="Nav-color">
                        Expert verification
                    </Nav.Link>
                    </Row>
                    <Row>
                    <FaFlag className="ml-3 my-auto mr-2"/>
                    <Nav.Link href="#" className="Nav-color">
                        Reports
                    </Nav.Link>
                    </Row>
                    <Row>
                    <FaChartBar className="ml-3 my-auto mr-2"/>
                    <Nav.Link href="#" className="Nav-color">
                        Detailed statistics
                    </Nav.Link>
                    </Row>
                    <Row>
                    <FaUsers className="ml-3 my-auto mr-2"/>
                    <Nav.Link href="#" className="Nav-color">
                        User management
                    </Nav.Link>
                    </Row>
                    <Row>
                    <FaNewspaper className="ml-3 my-auto mr-2"/>
                    <Nav.Link href="#" className="Nav-color">
                        Subject management
                    </Nav.Link>
                    </Row>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
    );
}