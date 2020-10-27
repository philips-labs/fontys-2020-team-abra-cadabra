import http from "../http-common";

const Login = (data) => {
    return http.post("/authenticate/Login", data);
  };
  
  const Register = (data) => {
    return http.post("/authenticate/Register", data);
  };

  export default {
    Login,
    Register,
  };