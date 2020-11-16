import axios from "axios";

const httpdefault = () => {
  return axios.create({
    baseURL: "https://localhost:44343/api",
    headers: {
      "Content-type": "application/json"
    }
  })
};
const httptoken = () => {
  const token = localStorage.getItem('Token');
  return axios.create({
    baseURL: "https://localhost:44343/api",
    headers: {
      "Content-type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  })
};

export default {
  httpdefault,
  httptoken,
};
