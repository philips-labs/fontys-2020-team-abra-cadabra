import { Container, Row, Col } from 'react-bootstrap';
import Navbar from 'src/components/Navbar.js';
import FilerNav from 'src/components/FilterNav';
import QuestionBody from 'src/components/QuestionBody.js';
import DefaultErrorPage from 'next/error';
import SubjectService from 'src/services/SubjectService';

function Subject({ subjectName, response }) {

  const subject = [
    "How do you dice an onion",
    "How big is an onion",
    "what color is an onion",
    "why is an onion round",
    "This is a test",
  ];

  console.log(response);

  if (response === 404 || response == "failure" || response === 400) {
    return (
      <DefaultErrorPage statusCode={404} />
    );
  }

  return (
    <>
      <Navbar subjectTitle={subjectName} />
      <QuestionBody question={response.questions} subject={subjectName} />
    </>
  );
}

export default Subject


export async function getServerSideProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  let apiRes = null;
  try {
    apiRes = await SubjectService.GetSubjectByID(params.subject);
  } catch (err) {
    //apiRes = err;
    apiRes = err.response?.status;
  }

  const subjectName = params?.subject;

  if (apiRes?.data?.subjectName != null) {

    const response = apiRes.data;

    return {
      props: {
        subjectName,
        response
      }
    }
  }
  else if (apiRes === 404 || apiRes === 400) {
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


