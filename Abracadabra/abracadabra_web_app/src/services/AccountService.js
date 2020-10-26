import http from "../http-common";

const Login = (data) => {
    const httptest = http.httpdefault()
    console.log(httptest)
    return http.httpdefault().post("/authenticate/Login", data);
  };
  
  const Register = (data) => {
    return http.httpdefault().post("/authenticate/Register", data);
  };

  export default {
    Login,
    Register,
  };