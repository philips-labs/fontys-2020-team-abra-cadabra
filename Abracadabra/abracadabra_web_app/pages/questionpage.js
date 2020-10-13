import Navbar from "../src/components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';

function QuestionPage() {
    return (
        <>
            <Navbar />
            <div className="row mx-auto questionHead">
                <h1 className="col-md-8 questionTitle">How do you dice an onion?</h1>
                <div className="col-md-4 d-flex justify-content-end">
                    <FontAwesomeIcon className="questionAvatar" icon={faUser} />
                    <p className="questionUsername">User4321</p>
                </div>
                <div className="row questionContent">
                    <p>I don't understand how I can cut an onion, can someone hlep me?</p>
                </div>
            </div>
        </>
    )
}

export default QuestionPage