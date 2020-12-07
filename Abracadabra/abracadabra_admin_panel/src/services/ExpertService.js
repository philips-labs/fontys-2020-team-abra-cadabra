import http from "./common-api";

const GetApplications = () => {
    return http.httptoken().get("/applications", { timeout: 3000 });
  };

  const AcceptApplication = (userID, data) => {
      data.Status = 1;
    return http.httptoken().put("/applications/" + userID, data, { timeout: 3000 });
  };

  const DenyApplication = (userID, data) => {
    data.Status = 2;
  return http.httptoken().put("/applications/" + userID, data, { timeout: 3000 });
};

  export default {
    GetApplications,
    AcceptApplication,
    DenyApplication
  };

