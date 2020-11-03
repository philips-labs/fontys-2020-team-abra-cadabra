import axios from 'axios';

    // this is bad for security, but the only way it will work on both mac and windows dev env.
   
  const httpdefault = () => { 
    const https = require('https');
    return axios.create({
      baseURL: " https://10.211.55.3:45455/api",
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });
  };

    const httptoken = () => {
      const token = localStorage.getItem('Token');
      const https = require('https');
      return axios.create({
        baseURL: " https://10.211.55.3:45455/api",
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${token}` 
      },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      });
    };

    export default {
      httpdefault,
      httptoken,
    };
    