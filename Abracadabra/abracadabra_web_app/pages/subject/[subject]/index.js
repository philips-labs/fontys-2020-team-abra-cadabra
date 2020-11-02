import {Container, Row, Col} from 'react-bootstrap';
import Navbar from "src/components/Navbar.js";
import QuestionBody from "src/components/QuestionBody.js";
import DefaultErrorPage from 'next/error';
import axios from 'axios';
 
function Subject({subjectName, response}) {

  const subject = [
    "How do you dice an onion",
    "How big is an onion",
    "what color is an onion",
    "why is an onion round",
    "This is a test",
  ];

  console.log(response);

    if(response === 404 || response == "failure" || response === 400)
    {
      return (
        <DefaultErrorPage statusCode={404} />
      );
    }

    return (
    <>
            <Navbar subjectTitle={subjectName}/>
            <QuestionBody question={response.questions} subject={subjectName}/>
    </>
    );
  }
  
  export default Subject

  
  export async function getServerSideProps({ params }) {
    // Fetch necessary data for the blog post using params.id

    // this is bad for security, but the only way it will work on both mac and windows dev env.
    const https = require('https');
    const instance = axios.create({
      httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      })
    });
    let apiRes = null;
    try {
      apiRes = await instance.get("https://10.211.55.3:45455/api/subjects/" + params.subject, {timeout: 5000});
    } catch (err) {
      //apiRes = err;
      apiRes = err.response?.status; 
    }

    const subjectName = params.subject;

    if(apiRes?.data?.subjectName != null) {

      const response = apiRes.data;

    return {
      props: {
        subjectName,
        response
      }
    }
  }
  else if(apiRes === 404 || apiRes === 400)
  {
    const response = apiRes;

    return {
      props: {
        subjectName,
        response
      }
    }
  }
  else {

    const response = "failure";

    return {
      props: {
        subjectName,
        response
      }
    }
  }
  }


