import axios from "axios";
const API = "http://localhost:3000/api/appointments";

const createAppointment = (data, token) => {
  return axios.post(API, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getAvailableTimes = (clinicId) => {
  return axios.get(`${API}/available/${clinicId}`);
};

const getUserAppointments = (token) => {
  return axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default { createAppointment, getAvailableTimes, getUserAppointments };

