import React, { useState, useEffect } from 'react'
import Navbar from "../src/components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faArrowAltCircleUp, faArrowAltCircleDown, faAward, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import QuestionService from '../src/services/QuestionService';

function QuestionPage() {
    const [question, setQuestion] = useState({});

    const search = async () => {
        const data = await QuestionService.GetQuestion(3);
        setQuestion(data);
        console.log(data);
    }

    return (
        <>
            <Navbar />
            <div className="mx-auto questionHead">
                <div className="row">
                    <h1 className="col-md-8 questionTitle"></h1>
                    <div className="col-md-4 d-flex justify-content-end">
                        <img onClick={search} className="questionAvatar" src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"></img>
                        <p className="questionUsername"></p>
                    </div>
                </div>
                <div className="row questionContent">
                    <p></p>
                </div>
                <div className="row justify-content-end">
                    <button className="questionButton">Submit Own Answer</button>
                </div>
            </div>

            <div className="answerHead mx-auto">
                <h1>A</h1>
                <div className="row asnwerDiv">
                    <div className="col-11 row">
                        <div className="col-xl-1">
                            <img className="questionAvatar" src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"></img>
                        </div>
                        <div className="col-xl-10 d-flex ml-1">
                            <p className="answerUsername"><span className="expert">RobertoTheExperto</span></p>
                            <FontAwesomeIcon className="checkmark" icon={faCheckSquare} />
                            <p className="answerTagExpert">Has Helped: <span>100</span> People</p>
                        </div>
                        <div className="col-xl-9 d-flex answerContent">
                            <p>
                                1. CUT THE ONION IN HALF:
                                <br />
                                To chop or mince an onion, first halve the onion pole to pole then lay each half cut side down on the cutting board. Lop off the tops of each half and trim the root end, being careful not to remove too much of the onion.
                                <br />
                                <br />
                                2. MAKE SEVERAL CUTS:
                                <br />
                                Peel the onion, then make several horizontal cuts from one end of the onion half almost to the other, but don’t cut all  the way through the root end. The number of cuts will depend on the size of the onion and the  desired size of the chop or dice. For...
                            </p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="d-flex">
                                <FontAwesomeIcon className="arrows" icon={faArrowAltCircleUp} />
                                <h4>100</h4>
                            </div>
                            <div className="d-flex">
                                <FontAwesomeIcon className="arrows" icon={faArrowAltCircleDown} />
                                <h4>50</h4>
                            </div>
                        </div>
                        <div className="row editIcons">
                            <div className="d-flex align-self-bottom">
                                <FontAwesomeIcon className="icon" icon={faAward} />
                                <FontAwesomeIcon className="icon" icon={faPencilAlt} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row asnwerDiv">
                    <div className="col-11 row">
                        <div className="col-xl-1">
                            <img className="questionAvatar" src="https://www.teamphenomenalhope.org/wp-content/uploads/2017/03/avatar-520x520.png"></img>
                        </div>
                        <div className="col-xl-10 d-flex ml-1">
                            <p className="answerUsername">User1234</p>
                            <p className="answerTagUser">Endorsed Answers: <span>10</span>  |  Has Helped: <span>100</span> People</p>
                        </div>
                        <div className="col-xl-9 d-flex answerContent">
                            <p>
                                Just use a knife and then cut it in half and stuff. And then just make little blocks out of them it’s easy
                            </p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="d-flex">
                                <FontAwesomeIcon className="arrows" icon={faArrowAltCircleUp} />
                                <h4>35</h4>
                            </div>
                            <div className="d-flex">
                                <FontAwesomeIcon className="arrows" icon={faArrowAltCircleDown} />
                                <h4>10</h4>
                            </div>
                        </div>
                        {/* <div className="row editIcons">
                            <div className="d-flex align-self-bottom">
                                <FontAwesomeIcon className="icon" icon={faAward} />
                                <FontAwesomeIcon className="icon" icon={faPencilAlt} />
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuestionPage