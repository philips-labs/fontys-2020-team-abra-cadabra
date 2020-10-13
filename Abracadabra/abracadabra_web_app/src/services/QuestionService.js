import http from "../http-common";
import axios from 'axios';

const Question = (data) => {
  return http.post("/Questions", data);
};

// async function GetQuestion(id) {
//   const { data } = await http.get("/Questions/", id);
//   return data;
// }

const URL = 'https://localhost:44343/api/Questions/';
const GetQuestion = async (id) => {
  const { data } = await axios.get(URL, id);
  return data;
}
export default {
  Question,
  GetQuestion
};

