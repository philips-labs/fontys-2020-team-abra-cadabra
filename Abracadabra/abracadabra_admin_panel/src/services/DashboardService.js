import http from "./common-api";

const Get = () => {
    return http.httpdefault().get("/dashboard", { timeout: 3000 });
  };

  export default {
    Get
  };