import http from "./common-api";

const Login = (data) => {
    return http.httpdefault().post("/authenticate/Login", data);
  };

  export default {
    Login
  };