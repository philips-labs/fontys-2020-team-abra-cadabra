import http from "../http-common";

const QuestionAnswer = (data) => {
    return http.httptoken().post("/api/Answers", data);
  };
  
  export default {
    QuestionAnswer
  };
  