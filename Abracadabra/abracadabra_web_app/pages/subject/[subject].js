import {Container, Row, Col} from 'react-bootstrap';

function Subject({subjectName}) {
    return (
    <h1>Hello world, welcome to {subjectName}</h1>
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


