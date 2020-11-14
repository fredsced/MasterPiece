import axios from 'axios';
import authHeaders from './authHeader';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const OU_END_POINT = process.env.REACT_APP_OU_END_POINT;

const OrgUnitService = {
  getAll: async () => {
    const optionsToGetAllOrgUnits = {
      url: `${API_BASE_URL}${OU_END_POINT}`,
      method: 'GET',
      headers: authHeaders(),
    };
    const result = await axios(optionsToGetAllOrgUnits);
    if (result.data) {
      return result.data;
    } else {
      return [];
    }
  },
};

export default OrgUnitService;
