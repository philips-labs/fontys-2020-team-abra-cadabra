import Navbar from 'src/components/Navbar.js';
import FilterButtons from 'src/components/FilterButtons';
import QuestionBody from 'src/components/QuestionBody.js';
import DefaultErrorPage from 'next/error';
import SubjectService from 'src/services/SubjectService';
import QuestionService from 'src/services/QuestionService';

function Subject({ subjectName, response }) {

    if (response === 404 || response == "failure" || response === 400) {
        return (
            <DefaultErrorPage statusCode={404} />
        );
    }

    return (
        <>
            <Navbar subjectTitle={subjectName} />
            <FilterButtons subjectTitle={subjectName} />
            <QuestionBody question={response} subject={subjectName} />
        </>
    );
}

export default Subject


export async function getServerSideProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    let apiRes = null;
    try {
        apiRes = await SubjectService.GetSubjectBySlug(params.subject);
    } catch (err) {
        apiRes = err.response?.status;
    }

    const subjectName = params?.subject;

    if (apiRes?.data?.subjectName != null) {

        const filter = "answered";
        let rspns = null;
        try {
            rspns = await QuestionService.GetFilteredQuestions(subjectName, filter);
        } catch (err) {
            rspns = err.response?.status;
        }
        console.log(rspns.data);

        const response = JSON.parse(JSON.stringify(rspns.data));

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


