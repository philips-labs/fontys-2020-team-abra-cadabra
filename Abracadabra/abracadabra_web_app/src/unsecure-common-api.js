import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const httpdefault = () => {
  const https = require("https");
  return axios.create({
    baseURL: url + "/api",
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
};

const httptoken = () => {
  const token = localStorage.getItem("Token");
  const https = require("https");
  return axios.create({
    baseURL: url + "/api",
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
