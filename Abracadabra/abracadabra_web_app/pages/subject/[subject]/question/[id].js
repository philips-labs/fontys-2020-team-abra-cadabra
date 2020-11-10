//react imports
import DefaultErrorPage from "next/error";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
//style imports
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faAward,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
//component imports
import Navbar from "src/components/Navbar.js";
import QuestionCreateAnswer from "src/components/QuestionCreateAnswer";
import QuestionAnswer from "src/components/QuestionAnwser"; //not used, this is a decent starting component, missing mobile friendly
import SubjectAnswer from "src/components/SubjectQuestionAnswer";
import SubjectQuestion from "src/components/SubjectQuestion";
//functionality imports
import QuestionService from "src/services/QuestionService";

function Question({ data, subject }) {
  // get the subject from router, to pass to the navbar for navigation button and title
  // const router = useRouter()
  // const { subject, id } = router.query
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    //GetQuestion();
    setQuestion(data);
    setAnswers(data.answerViewModels);
  }, [data.answerViewModels]);

  if (data === 404 || data == "failure" || data === 400) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Navbar subjectTitle={subject} />
      <SubjectQuestion question={question} />

      <div className="answerHead mx-auto">
        <h1>A</h1>
        {/* Create component for answer tnx */}
        {answers.map((answer) => (
          <SubjectAnswer key={answer.id} answer={answer} />
        ))}
        <QuestionCreateAnswer QID={question.id} />
      </div>
    </>
  );
}

export default Question;

export async function getServerSideProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  let apiRes = null;
  try {
    (apiRes = await QuestionService.GetQuestion(params.id)), { timeout: 5000 };
  } catch (err) {
    //apiRes = err;
    apiRes = err.response?.status;
  }

  const subject = params?.subject;

  if (apiRes?.data?.title != null) {
    const data = apiRes.data;

    return {
      props: {
        data,
        subject,
      },
    };
  } else if (apiRes === 404 || apiRes === 400) {
    const data = apiRes;

    return {
      props: {
        data,
        subject,
      },
    };
  } else {
    const data = "failure";

    return {
      props: {
        data,
        subject,
      },
    };
  }
}
