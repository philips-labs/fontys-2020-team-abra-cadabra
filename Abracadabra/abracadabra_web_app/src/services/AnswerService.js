import http from "../unsecure-common-api";


const GetAnswer = (data) => {
  return http.httptoken().get("/answers/" + data, { timeout: 5000 });
};



export default {
  GetAnswer,

};

