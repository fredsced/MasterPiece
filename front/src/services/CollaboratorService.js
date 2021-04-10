import axios from 'axios';
import authHeaders from './authHeader';

const LOCAL_STORAGE_USER = process.env.REACT_APP_LOCAL_STORAGE_USER;

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const COLLABORATORS_END_POINT = process.env.REACT_APP_COLLABORATORS_END_POINT;

const CollaboratorService = {
  save: async (values) => {
    const optionsToCreateProfile = {
      url: `${API_BASE_URL}${COLLABORATORS_END_POINT}`,
      method: 'PUT',
      data: JSON.stringify(values),
      headers: authHeaders(),
    };
    const response = await axios(optionsToCreateProfile);
    if (response.data) {
      return response.data;
    }
  },
  updateCollaboratorProfile: (values) => {
    const userToUpdate = JSON.parse(sessionStorage.getItem(LOCAL_STORAGE_USER));
    userToUpdate.accountHasProfile = true;
    userToUpdate.collaboratorInfo = {
      lastname: values.lastname,
      firstname: values.firstname,
      sesame: values.sesame,
      countryId: values.countryId,
      organisationUnitId: values.organisationUnitId,
    };
    sessionStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(userToUpdate));
  },
};
export default CollaboratorService;
