import http from "../http-common";

const Question = (data) => {
  return http.post("/authenticate/Questions", data);
};

export default {
  Question
};
