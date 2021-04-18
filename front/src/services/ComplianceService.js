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
    return await axios(optionsToFindCR);
  },
  saveCR: async (values) => {
    const collaboratorDto = {
      lastname: values.lastname,
      firstname: values.firstname,
      sesame: values.sesame,
      country: values.country,
      organisationUnit: values.organisationUnit,
    };
    values.collaboratorDto = collaboratorDto;
    const optionsToSaveCR = {
      url: `${API_BASE_URL}${COMPLIANCE_END_POINT}`,
      method: 'POST',
      data: JSON.stringify(values),
      headers: authHeaders(),
    };
    return await axios(optionsToSaveCR);
  },
};
export default ComplianceService;
