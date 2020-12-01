import http from "../unsecure-common-api";

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





export default {
    FlagQuestion,
    FlagAnswer,
    UnFlagQuestion,
    UnFlagAnswer
};

