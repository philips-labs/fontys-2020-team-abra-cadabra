import http from "../unsecure-common-api";


const GetAnswer = (data) => {
  return http.httptoken().get("/answers/" + data, { timeout: 5000 });
};
const GetAnswerEndorsement = (data) => {
  return http.httptoken().get("/EndorsedAnswers/" + data, { timeout: 100000 });
};
const GetAllAnswerEndorsements = (data) => {
  return http.httptoken().get("/EndorsedAnswers/" + data + "/all", { timeout: 100000 });
};
const PostAnswerEndorsement = (data) => {
  return http.httptoken().post("/EndorsedAnswers/" + data, { timeout: 5000 });
};
const DeleteAnswerEndorsement = (data) => {
  return http.httptoken().delete("/EndorsedAnswers/" + data, { timeout: 5000 });
};



export default {
  GetAnswer,
  PostAnswerEndorsement,
  GetAnswerEndorsement,
  GetAllAnswerEndorsements,
  DeleteAnswerEndorsement

};

