import {Container, Row, Col} from 'react-bootstrap';
import Navbar from "src/components/Navbar.js";
import DefaultErrorPage from 'next/error';
import axios from 'axios';
import { useRouter } from 'next/router'
 
function Subject() {

        // get the subject from router, to pass to the navbar for navigation button and title
        const router = useRouter()
        const { subject } = router.query

    return (
    <>
            <Navbar subjectTitle={subject}/>
            {/* @RealSnowKid drop your stuf here. */}
    </>
    );
  }
  
  export default Subject



