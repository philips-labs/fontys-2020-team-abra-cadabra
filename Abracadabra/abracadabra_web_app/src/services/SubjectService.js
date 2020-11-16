import http from "../unsecure-common-api";

const GetAllSubjects = () => {
  return http.httpdefault().get("/subjects");
};

const GetSubjectBySlug = (data) => {
  return http.httpdefault().get("/subjects/" + data, { timeout: 5000 });
};

const GetQuestionBySearch = (data) => {
  return http.httpdefault().get("/subjects/cooking/searchBar", {
    params: {
      subject: data.subject,
      search: data.search,
    },
  });
};

export default {
  GetAllSubjects,
  GetSubjectBySlug,
  GetQuestionBySearch,
};
