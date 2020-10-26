import http from "../http-common";

const QuestionAnswer = (data) => {
    return http.httptoken().post("/answers", data);
  };
  
  export default {
    QuestionAnswer
  };
  