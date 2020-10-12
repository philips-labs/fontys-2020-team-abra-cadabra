import QuestionHead from "../src/components/QuestionHead";
import QuestionAnwser from "../src/components/QuestionAnwser";
import QuestionCreateAnswer from "../src/components/QuestionCreateAnswer";
import Navbar from "../src/components/Navbar";

function QuestionPage() {
    return <div>
        <Navbar />
        <QuestionHead />
        <QuestionAnwser />
        <QuestionCreateAnswer />
    </div>

}

export default QuestionPage