import axios from "axios";

const httpdefault = () => {
  const https = require("https");
  return axios.create({
    baseURL: "https://localhost:44343/api",
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
};

const httptoken = () => {
  const token = localStorage.getItem("Token");
  const https = require("https");
  return axios.create({
    baseURL: "https://localhost:44343/api",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
};

export default {
  httpdefault,
  httptoken,
};
