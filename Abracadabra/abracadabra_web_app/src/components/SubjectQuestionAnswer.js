import {Container, Row, Col} from 'react-bootstrap';
import VotesService from "../services/VotesService";


export default function Answer({answer}) {
    const [voted, setVoted] = useState()
    const [vote, setVote] = useState()
    
    
    const handleClick = () => {
        if (voted == true){
        VotesService.PostVoteAnswer(vote).then((res) => {
            console.log(res);
            console.log(res.data);
        })
            .catch((error) => {
                console.log(error.response.data);
            });
      }
    };
    return (
        <>
            <Row className="border-bottom mb-3">
                <Col md={10} className="mx-auto">
                    {/* Answer header */}
                    <Row>
                        <Col md={1}>
                            <img className="questionAvatar" src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"></img>
                        </Col>
                        <Col md={7}>
                            <h6 className="font-weight-bold">{answer.userName}</h6>

                        </Col>
                        <Col md={4}>
                            <h6 className="font-weight-bold helpedText">Has Helped: <span>100</span> People</h6>
                        </Col>
                    </Row>
                    {/* Answer content */}
                    <Row>
                        <Col md={1}></Col>
                        <Col>
                            <p className="answerContentText">{answer.answerContent}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );

}