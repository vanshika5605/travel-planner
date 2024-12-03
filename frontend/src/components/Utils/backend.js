import axios from "axios";

export const CONNECTION_URL = `http://localhost:8081/api/v1`;

const getFeaturesList = () => {
  return axios.get(CONNECTION_URL + `/getFeatures`);
};

const addUser = (formData)=>{
  return axios.post(CONNECTION_URL + '/signUp', formData);
}

const login = (formData)=>{
  return axios.post(CONNECTION_URL + '/login', formData);
}

const getHolidays = () => {
  return axios.get('https://date.nager.at/api/v3/publicholidays/2024/US');
}

const getExchangeRates = () => {
  return axios.get("https://open.er-api.com/v6/latest/USD");
}

const backend = {
  getFeaturesList,
  addUser,
  login,
  getHolidays,
  getExchangeRates
};

export default backend;
