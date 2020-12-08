import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL || "https://localhost:5001";

const httpdefault = () => {
  return axios.create({
    baseURL: url + "/api",
    headers: {
      "Content-type": "application/json",
    },
  });
};
const httptoken = () => {
  const token = localStorage.getItem("Token");
  return axios.create({
    baseURL: url + "/api",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  httpdefault,
  httptoken,
};
