import axios from 'axios';
import authHeaders from './authHeader';
const LOCAL_STORAGE_USER = process.env.REACT_APP_LOCAL_STORAGE_USER;

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const COLLABORATORS_END_POINT = process.env.REACT_APP_COLLABORATORS_END_POINT;

const CollaboratorService = {
  create: async (values) => {
    const optionsToCreateProfile = {
      url: `${API_BASE_URL}${COLLABORATORS_END_POINT}`,
      method: 'POST',
      data: JSON.stringify(values),
      headers: authHeaders(),
    };
    const response = await axios(optionsToCreateProfile);
    if (response.data) {
      return response.data;
    }
  },
  updateCollaboratorProfile: (values) => {
    const userToUpdate = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
    userToUpdate.accountHasProfile = true;
    userToUpdate.collaboratorName = values.name;
    userToUpdate.collaboratorFirstname = values.firstname;
    localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(userToUpdate));
  },
};
export default CollaboratorService;
