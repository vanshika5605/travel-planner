import axios from "axios";

export const CONNECTION_URL = `http://localhost:8081`;

const getFeaturesList = () => {
  return axios.get(CONNECTION_URL + `/getFeatures`);
};

const addUser = (formData)=>{
  return axios.post(CONNECTION_URL + '/addUser', formData);
}

const backend = {
  getFeaturesList,
  addUser
};

export default backend;
