import axios from "axios";

export default axios.create({
  baseURL: "https://10.211.55.3:45455/api",
  headers: {
    "Content-type": "application/json",
  },
});
