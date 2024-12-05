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

const saveTrip = (formData) => {
  return axios.post(CONNECTION_URL + '/addItinerary', formData);
}

const getTrips = (email) => {
  return axios.get(CONNECTION_URL + '/user/tripDetails/' + email);
}

const getUserStatistics = () => {
  return axios.get(CONNECTION_URL + '/admin/statistics');
}

const getPackingList = (tripId) => {
  return axios.get(CONNECTION_URL + '/getList/' + tripId);
}

const savePackingList = (packingList) => {
  return axios.post(CONNECTION_URL + '/saveList', packingList);
}

const backend = {
  getFeaturesList,
  addUser,
  login,
  getHolidays,
  getExchangeRates,
  saveTrip,
  getTrips,
  getUserStatistics,
  getPackingList,
  savePackingList
};

export default backend;
