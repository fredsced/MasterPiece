import axios from 'axios';
import authHeaders from './authHeader';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const CLEAR_CACHES_END_POINT = process.env.REACT_APP_CLEAR_CACHES_END_POINT;

const ClearCachesService = {
  clearAll: async () => {
    const optionsToClearCaches = {
      url: `${API_BASE_URL}${CLEAR_CACHES_END_POINT}`,
      method: 'GET',
      headers: authHeaders(),
    };
    return await axios(optionsToClearCaches);
  },
  clear: async (cache) => {
    const optionsToClearCache = {
      url: `${API_BASE_URL}${CLEAR_CACHES_END_POINT}/${cache}`,
      method: 'GET',
      headers: authHeaders(),
    };
    return await axios(optionsToClearCache);
  },
};
export default ClearCachesService;
