import http from "./common-api";

const Login = (data) => {
    return http.httpdefault().post("/authenticate/Login", data, { timeout: 3000 });
  };

  export default {
    Login
  };