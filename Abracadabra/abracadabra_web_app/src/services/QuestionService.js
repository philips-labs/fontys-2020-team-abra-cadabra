import http from "../http-common";

const Question = (data) => {
  return http.post("/Questions", data);
};

export default {
  Question
};

