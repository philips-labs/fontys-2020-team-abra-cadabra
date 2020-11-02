import http from "../common-api";

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
  