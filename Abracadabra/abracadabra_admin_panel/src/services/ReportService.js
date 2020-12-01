import http from "./common-api";

const FlagQuestion = (questionID) => {
  return http.httptoken().post("/flaggedentities/question/" + questionID, { timeout: 3000 });
};
const FlagAnswer = (answerID) => {
    return http.httptoken().post("/flaggedentities/answer/" + answerID, { timeout: 3000 });
  };

const UnFlagQuestion = (questionID) => {
return http.httptoken().delete("/flaggedentities/question/" + questionID, { timeout: 3000 });
};

const UnFlagAnswer = (answerID) => {
    return http.httptoken().delete("/flaggedentities/answer/" + answerID, { timeout: 3000 });
};

const GetFlaggedQuestions = () => {
    return http.httptoken().get("/flaggedentities/question", { timeout: 3000 });
};

const GetFlaggedAnswers = () => {
    return http.httptoken().get("/flaggedentities/answer", { timeout: 3000 });
};

const DeleteFlaggedQuestion = (questionID) => {
    return http.httptoken().delete("/questions/" + questionID, { timeout: 3000 });
};

const DeleteFlaggedAnswer = (answerID) => {
    return http.httptoken().delete("/answers/" + answerID, { timeout: 3000 });
};


export default {
    FlagQuestion,
    FlagAnswer,
    UnFlagQuestion,
    UnFlagAnswer,
    GetFlaggedQuestions,
    GetFlaggedAnswers,
    DeleteFlaggedQuestion,
    DeleteFlaggedAnswer
};

