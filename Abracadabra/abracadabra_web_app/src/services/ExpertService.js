import http from "../unsecure-common-api";

const applyExpert = (data) => {
  return http.httptoken().post("/applications", data);
};

const getPending = () => {
  return http.httptoken().get("/applications");
};

export default {
  applyExpert,
  getPending,
};
