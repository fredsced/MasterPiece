import axios from 'axios';
import authHeaders from './authHeader';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const LEVELS_END_POINT = process.env.REACT_APP_LEVELS_END_POINT;

const LevelsService = {
  getAll: async () => {
    const optionsToGetAllLevels = {
      url: `${API_BASE_URL}${LEVELS_END_POINT}`,
      method: 'GET',
      headers: authHeaders(),
    };
    return await axios(optionsToGetAllLevels);
  },
};

export default LevelsService;
