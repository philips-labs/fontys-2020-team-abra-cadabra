import http from "../http-common";

const GetAllSubjects = () => {
    return http.get("/subjects");
  };
  
  const GetSubjectByID = (data) => {
    return http.get("/subjects/GetByID", data);
  };

  export default {
    GetAllSubjects,
    GetSubjectByID,
  };