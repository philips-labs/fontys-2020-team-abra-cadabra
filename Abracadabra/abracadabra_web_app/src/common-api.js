import axios from "axios";

const httpdefault = () => {
  return axios.create({ 
    baseURL: " https://10.211.55.3:45455/api",
    headers: {
      "Content-type": "application/json"
  }
})
};
const httptoken = () => {
  const token = localStorage.getItem('Token');
  return axios.create({
    baseURL: " https://10.211.55.3:45455/api",
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
