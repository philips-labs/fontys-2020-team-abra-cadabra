import axios from 'axios';

    // this is bad for security, but the only way it will work on both mac and windows dev env.
    const https = require('https');
  export default axios.create({
      baseURL: " https://10.211.55.3:45455/api",
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });