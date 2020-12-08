import http from "./common-api";

const GetByName = (name) => {
    return http.httptoken().get("/users/byname/" + name, { timeout: 3000 });
  };

  const BanUser = (id) => {
    return http.httptoken().put("/users/ban/" + id, { timeout: 3000 });
  };

  const UnBanUser = (id) => {
    return http.httptoken().put("/users/unban/" + id, { timeout: 3000 });
  };

  export default {
    GetByName,
    BanUser,
    UnBanUser
  };

