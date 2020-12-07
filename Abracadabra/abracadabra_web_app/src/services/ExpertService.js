import http from "../unsecure-common-api";

const applyExpert = (data) => {
  return http.httptoken().post("/applications", data);
};

const getPending = (data) => {
  return http.httptoken().get("/applications/" + data);
};

export default {
  applyExpert,
  getPending,
};
