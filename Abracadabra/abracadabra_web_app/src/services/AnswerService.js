import http from "../unsecure-common-api";


const GetAnswer = (data) => {
  return http.httptoken().get("/answers/" + data, { timeout: 5000 });
};
const GetAnswerEndorsement = (data) => {
  return http.httptoken().get("/answers/" + data, { timeout: 5000 });
};
const PostAnswerEndorsement = (data) => {
  return http.httptoken().post("/answers/" + data, { timeout: 5000 });
};
const DeleteAnswerEndorsement = (data) => {
  return http.httptoken().delete("/answers/" + data, { timeout: 5000 });
};



export default {
  GetAnswer,
  PostAnswerEndorsement,
  GetAnswerEndorsement,
  DeleteAnswerEndorsement

};

