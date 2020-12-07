import http from "./common-api";

const GetApplications = () => {
    return http.httptoken().get("/applications/all", { timeout: 3000 });
  };

  const GetApplicationsDashboard = () => {
    return http.httptoken().get("/applications/dashboard", { timeout: 3000 });
  };

  const AcceptApplication = (data) => {
      data.status = 1;
    return http.httptoken().put("/applications/" + data.userId, data, { timeout: 3000 });
  };

  const DenyApplication = (data) => {
    data.status = 2;
  return http.httptoken().put("/applications/" + data.userId, data, { timeout: 3000 });
};

  export default {
    GetApplications,
    AcceptApplication,
    DenyApplication
  };

