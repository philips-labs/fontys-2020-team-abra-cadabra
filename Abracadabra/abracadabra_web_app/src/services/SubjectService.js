import http from "../http-common";

const GetAllSubjects = () => {
    http.get("api/subjects");

    return [];
  };
  
  const GetSubjectByID = (data) => {
    return http.get("/subjects/GetByID", data);
  };

  export default {
    GetAllSubjects,
    GetSubjectByID,
  };