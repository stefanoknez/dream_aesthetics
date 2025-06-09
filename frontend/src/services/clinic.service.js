import axios from "axios";
const API = "http://localhost:3000/api/treatments";

const getClinicsForTreatment = (treatmentId) => {
  return axios.get(`${API}/${treatmentId}/clinics`);
};

export default { getClinicsForTreatment };