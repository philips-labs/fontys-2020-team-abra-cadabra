import http from "../unsecure-common-api";

const PostVoteAnswer = (data) => {
  return http.httptoken().post("/votes/answer", data);
};
const DeleteVoteAnswer = (data) => {
  return http.httptoken().delete("/votes/answer", data);
};
const PutVoteAnswer = (data) => {
  return http.httptoken().put("/votes/answer", data);
};




export default {
  PostVoteAnswer,
  DeleteVoteAnswer,
  PutVoteAnswer
};

