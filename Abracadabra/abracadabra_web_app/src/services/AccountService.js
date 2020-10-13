import http from "../http-common";

const Login = (data) => {
    return http.post("/authenticate", data);
  };
  
  const Register = (data) => {
    return http.post("/authenticate", data);
  };

  export default {
    Login,
    Register,
  };
  