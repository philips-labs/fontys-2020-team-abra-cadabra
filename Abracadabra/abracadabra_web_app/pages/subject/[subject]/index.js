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

    if(response === 404 || response == "failure" || response === 400)
    {
      return (
        <DefaultErrorPage statusCode={404} />
      );
    }

    console.log(response);

    return (
    <>
            <Navbar subjectTitle={subjectName}/>
            <QuestionBody question={subject}/>
    </>
    );
  }
  
  export default Subject

  
  export async function getServerSideProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    let apiRes = null;
    try {
      apiRes = await axios.get("https://10.211.55.3:45455/api/subjects/" + params.subject);
    } catch (err) {
      apiRes = err.response.status;
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


