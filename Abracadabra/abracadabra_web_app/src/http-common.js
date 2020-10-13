import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:44343/api",
  headers: {
    "Content-type": "application/json",
    "authorization": localStorage.getItem('Token')
  },
});
