import http from "../unsecure-common-api";

const PostVoteAnswer = (data) => {
  return http.httptoken().post("/votes/answer", data);
};

const Question = (data) => {
  return http.httptoken().post("/questions", data);
};




export default {
  PostVoteAnswer,
  Question
};

