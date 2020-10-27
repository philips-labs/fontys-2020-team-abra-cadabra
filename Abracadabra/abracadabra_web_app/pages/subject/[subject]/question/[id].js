import {Container, Row, Col} from 'react-bootstrap';
import Navbar from "src/components/Navbar.js";
import QuestionBody from "src/components/QuestionBody.js";
import DefaultErrorPage from 'next/error';
import axios from 'axios';
 
function Subject() {


    return (
    <>
            <Navbar subjectTitle={'test'}/>
    </>
    );
  }
  
  export default Subject



