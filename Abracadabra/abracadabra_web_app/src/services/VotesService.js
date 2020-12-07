import http from "../unsecure-common-api";

const PostVoteAnswer = (data) => {
  return http.httptoken().post("/votes/answer", data);
};
const DeleteVoteAnswer = (data) => {
  return http.httptoken().delete("/votes/answer/" + data, { timeout: 5000 });
};
const PutVoteAnswer = (data) => {
  return http.httptoken().put("/votes/answer", data);
};
const GetAnswerVote = (data) => {
  return http.httptoken().get("/votes/answer/" + data, { timeout: 5000 });
};
const PostVoteQuestion = (data) => {
  return http.httptoken().post("/votes/question", data);
};
const DeleteVoteQuestion = (data) => {
  return http.httptoken().delete("/votes/question/" + data, { timeout: 5000 });
};
const PutVoteQuestion = (data) => {
  return http.httptoken().put("/votes/question", data);
};
const GetQuestionVote = (data) => {
  return http.httptoken().get("/votes/question/" + data, { timeout: 5000 });
};




export default {
  PostVoteAnswer,
  DeleteVoteAnswer,
  PutVoteAnswer,
  GetAnswerVote,
  PostVoteQuestion,
  DeleteVoteQuestion,
  PutVoteQuestion,
  GetQuestionVote,
};
