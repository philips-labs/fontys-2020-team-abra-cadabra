//process.env.APP_URL
import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL || "http://10.211.55.3:45455";

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
  const token = localStorage.getItem('Token');
  return axios.create({
    baseURL: process.env.API_URL + "/api",
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
