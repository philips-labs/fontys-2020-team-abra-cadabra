import http from "./common-api";

const GetAllSubjects = () => {
    return http.httptoken().get("/subjects", { timeout: 3000 });
  };

  const GetSubjectBySlug = (name) => {
    return http.httptoken().get("/subjects/" + name, { timeout: 3000 });
  };

  const EditSubject = (id,subject) => {
    return http.httptoken().put("/subjects/" + id, subject, { timeout: 3000 });
  };

  const AddSubject = (subject) => {
    return http.httptoken().post("/subjects", subject, { timeout: 3000 });
  };

  const RemoveSubject = (id) => {
    return http.httptoken().delete("/subjects/" + id, { timeout: 3000 });
  };

  export default {
    GetAllSubjects,
    GetSubjectBySlug,
    EditSubject,
    RemoveSubject,
    AddSubject
  };

