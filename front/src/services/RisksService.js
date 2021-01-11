import axios from 'axios';
import authHeaders from './authHeader';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const RISKS_END_POINT = process.env.REACT_APP_RISKS_END_POINT;

const RisksService = {
  getAll: async () => {
    const optionsToGetAllRisks = {
      url: `${API_BASE_URL}${RISKS_END_POINT}`,
      method: 'GET',
      headers: authHeaders(),
    };
    const result = await axios(optionsToGetAllRisks);
    if (result.data) {
      return result.data;
    } else {
      return [];
    }
  },
};

export default RisksService;
