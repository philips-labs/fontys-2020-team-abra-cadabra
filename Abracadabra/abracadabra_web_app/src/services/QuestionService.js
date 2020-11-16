import http from "../unsecure-common-api";

const QuestionAnswer = (data) => {
  return http.httptoken().post("/answers", data);
};

const Question = (data) => {
  return http.httptoken().post("/questions", data);
};

const GetQuestion = (data) => {
  return http.httpdefault().get("/questions/" + data, { timeout: 5000 });
};

const GetFilteredQuestions = (subject, filter) => {
  return http.httpdefault().get("/questions/" + subject + "/" + filter, { timeout: 5000 });
};

export default {
  Question,
  QuestionAnswer,
  GetQuestion,
  GetFilteredQuestions
};

