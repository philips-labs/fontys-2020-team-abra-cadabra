import http from "../http-common";

const QuestionAnswer = (data) => {
    return http.httptoken().post("/answers", data);
  };
  
const Question = (data) => {
  return http.httptoken().post("/questions", data);
};

export default {
  Question,
  QuestionAnswer
};

