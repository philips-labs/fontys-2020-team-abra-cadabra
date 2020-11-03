import http from "../unsecure-common-api";

const GetAllSubjects = () => {
    http.get("api/subjects");
  };
  
  const GetSubjectByID = (data) => {
      return http.get("/subjects/" + data, {timeout: 5000});
  };

  export default {
    GetAllSubjects, 
    GetSubjectByID,
  };