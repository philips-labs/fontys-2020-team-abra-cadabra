import http from "../unsecure-common-api";

const GetAllSubjects = () => {
    return http.httpdefault().get("api/subjects");
  };
  
  const GetSubjectByID = (data) => {
      return http.httpdefault().get("/subjects/" + data, {timeout: 5000});
  };

  export default {
    GetAllSubjects, 
    GetSubjectByID,
  };