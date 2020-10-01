import axios from 'axios';
import authHeader from './authHeader';

const API_URL = process.env.REACT_APP_SERVER_URL;

class UserService {
  getUserProfile() {
    const options = {
      method: 'GET',
      url: `${API_URL}/api/accountInfo`,
      headers: authHeader(),
    };
    return axios(options);
  }
}

export default new UserService();
