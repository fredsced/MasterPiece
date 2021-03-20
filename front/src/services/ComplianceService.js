import axios from 'axios';
import authHeaders from './authHeader';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const COMPLIANCE_END_POINT = process.env.REACT_APP_COMPLIANCE_END_POINT;

const ComplianceService = {
  getMyCR: async (values) => {
    const optionsToFindCR = {
      url: `${API_BASE_URL}${COMPLIANCE_END_POINT}`,
      params: values,
      method: 'GET',
      headers: authHeaders(),
    };
    return  await axios(optionsToFindCR);
  },
};
export default ComplianceService;
