import axios from "axios";

// this is bad for security, but the only way it will work on both mac and windows dev env.
const https = require("https");
export default axios.create({
  baseURL: "https://localhost:44343/api",
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});
