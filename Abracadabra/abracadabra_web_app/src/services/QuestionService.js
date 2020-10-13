import http from "../http-common";

const QuestionAnswer = (data) => {
    return http.post("/api/Answers", data);
  };
  
  export default {
    QuestionAnswer
  };
  