import axios from 'axios';
import authHeader from './authHeader';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const ACCOUNT_INFO_END_POINT = process.env.REACT_APP_ACCOUNT_INFO_END_POINT;

class UserService {
  getUserProfile() {
    const options = {
      method: 'GET',
      url: `${API_BASE_URL}${ACCOUNT_INFO_END_POINT}`,
      headers: authHeader(),
    };
    return axios(options);
  }
}

export default new UserService();
