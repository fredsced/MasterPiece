import axios from 'axios';
import authHeader from './authHeader';

const API_URL = process.env.REACT_APP_SERVER_URL;

class UserService {
  getUserProfile() {
    return axios.get(API_URL + '/user', { headers: authHeader() });
  }
}

export default new UserService();
