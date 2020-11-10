//import react-bootstrap navbar parts 
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
//import react bootstrap
import {Image} from 'react-bootstrap';
//nextjs router hook
import { useRouter } from "next/router";
//import image
import Logo from 'public/images/Abra_Logo_Centered.png';

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
                    <Nav.Link href="#">
                        Username
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
    );
}