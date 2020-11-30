//import react-bootstrap navbar parts 
import Navbar from 'react-bootstrap/Navbar'
//import react bootstrap
import {Image, Row, FormControl, InputGroup,Button} from 'react-bootstrap';
//nextjs router hook
import { useRouter } from "next/router";
//import image
import Logo from 'public/images/Abra_Logo_Centered.png';

export default function BlankNavBar() {

    const router = useRouter();

    return (
            <Navbar collapseOnSelect expand="lg" variant="dark" className="Default-Navbar">
                <Navbar.Brand href="/" className="p-0 d-flex">   
                    <Image src={Logo} height={60} className="my-auto"/>
                    <h5 className="my-auto">Abracadabra</h5>
                </Navbar.Brand>
                </Navbar>
    );
}