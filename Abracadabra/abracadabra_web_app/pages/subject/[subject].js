import {Container, Row, Col} from 'react-bootstrap';
import Navbar from "src/components/Navbar.js";
import QuestionBody from "src/components/QuestionBody.js";
 
function Subject({subjectName}) {
    return (
   
    <>
            <Navbar subjectTitle={subjectName}/>
            <QuestionBody />
    </>
    );
  }
  
  export default Subject

  export async function getStaticPaths() {
    // Return a list of possible value for id
        const paths = [{params: { subject: 'cooking'}},{params: { subject: 'politics'}}]; //get all possible subjects from DB
        return {
          paths,
          fallback: false
        }
      }

  
  export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const subjectName = params.subject
    return {
      props: {
        subjectName
      }
    }
  }


