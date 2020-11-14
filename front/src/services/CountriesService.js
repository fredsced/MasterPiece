import axios from 'axios';
import authHeaders from './authHeader';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const COUNTRIES_END_POINT = process.env.REACT_APP_COUNTRIES_END_POINT;

const CountriesService = {
  getAll: async () => {
    const optionsToGetAllCountries = {
      url: `${API_BASE_URL}${COUNTRIES_END_POINT}`,
      method: 'GET',
      headers: authHeaders(),
    };
    const result = await axios(optionsToGetAllCountries);
    if (result.data) {
      return result.data;
    } else {
      return [];
    }
  },
};

export default CountriesService;
