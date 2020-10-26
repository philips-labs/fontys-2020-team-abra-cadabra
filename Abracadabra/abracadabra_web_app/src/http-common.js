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
  return axios.create({
    baseURL: "https://localhost:44343/api",
    headers: {
      "Content-type": "application/json",
      "authorization": localStorage.getItem('Token') 
  }
})
};

export default {
  httpdefault,
  httptoken,
};
