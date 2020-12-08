import http from "../unsecure-common-api";

const Login = (data) => {
  const httptest = http.httpdefault();
  console.log(httptest);
  return http.httpdefault().post("/authenticate/Login", data);
};

const Register = (data) => {
  return http.httpdefault().post("/authenticate/Register", data);
};

const getUser = (data) => {
  return http.httptoken().get("/users/" + data);
};

const editUser = (data) => {
  return http.httptoken().put("/users/edit/" + data.id, data);
};

const editPassword = (data) => {
  return http.httptoken().put("/users/edit/password/" + data.id, data);
};

export default {
  Login,
  Register,
  getUser,
  editUser,
  editPassword,
};
