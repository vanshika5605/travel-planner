import axios from "axios";

// Defining the API base URLs
export const CONNECTION_URL = `http://localhost:8081/api/v1`;

export const CONNECTION_URL_2 = `http://localhost:5050/api/v1`;

/*
* This file contains all calls to backend.
*/
const getFeaturesList = () => {
  return axios.get(CONNECTION_URL + `/getFeatures`);
};

const addUser = (formData)=>{
  return axios.post(CONNECTION_URL + '/signUp', formData);
}

const login = (formData)=>{
  return axios.post(CONNECTION_URL + '/login', formData);
}

const getHolidays = (year) => {
  return axios.get('https://date.nager.at/api/v3/publicholidays/'+ year +'/US');
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

const getTripDetails = (tripId) => {
  return axios.get(CONNECTION_URL + '/getItinerary/' + tripId);
}

const generatePackingList = (formData) => {
  return axios.post(CONNECTION_URL_2 + '/packingList/create', formData);
}

const generateItinerary = (formData) => {
  return axios.post(CONNECTION_URL_2 + '/itinerary/create', formData);
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
  savePackingList,
  getTripDetails,
  generatePackingList,
  generateItinerary
};

export default backend;
