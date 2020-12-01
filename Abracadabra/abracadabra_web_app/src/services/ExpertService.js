import http from "../unsecure-common-api";

const applyExpert = (data) => {
  return http.httptoken().post("/expert", data);
};

const getPending = (data) => {
  return http.httptoken().get("/expert" + data);
};

export default {
  applyExpert,
  getPending,
};
