import { Container, Row, Col } from "react-bootstrap";
import Navbar from "src/components/Navbar.js";
import QuestionBody from "src/components/QuestionBody.js";
import DefaultErrorPage from "next/error";
import SubjectService from "src/services/SubjectService";
import { useRouter } from "next/router";
import { search } from "__mocks__/fileMock";

function Subject({ subjectName, response }) {
  const router = useRouter();
  const { subject, search } = router.query;

  console.log(subjectName);

  if (response === 404 || response == "failure" || response === 400) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Navbar subjectTitle={subjectName} />
      <QuestionBody
        question={response.questions}
        subject={subjectName}
        search={search}
        searchLength={search.length}
      />
    </>
  );
}

export default Subject;

export async function getServerSideProps({ params }) {
  const searchData = {
    subject: params.subject,
    search: params.search,
  };

  // Fetch necessary data for the blog post using params.id
  let apiRes = null;
  try {
    apiRes = await SubjectService.GetQuestionBySearch(searchData);
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
        response,
      },
    };
  } else if (apiRes === 404 || apiRes === 400) {
    const response = apiRes;

    return {
      props: {
        subjectName,
        response,
      },
    };
  } else {
    const response = "failure";

    return {
      props: {
        subjectName,
        response,
      },
    };
  }
}
