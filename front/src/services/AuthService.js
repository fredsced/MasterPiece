import axios from 'axios';
import queryString from 'query-string';

const API_URL = process.env.REACT_APP_SERVER_URL;

const AuthService = {
  login: async (email, password) => {
    const optionsToLogin = {
      url: `${API_URL}/oauth/token`,
      method: 'POST',
      data: queryString.stringify({
        username: email,
        password: password,
        client_id: process.env.REACT_APP_CLIENT_ID,
        grant_type: 'password',
      }),
      header: { 'content-type': 'application/x-www-form-urlencoded' },
    };
    const response = await axios(optionsToLogin);
    if (response.data.access_token) {
      localStorage.setItem('user', JSON.stringify(response.data));
      const expiresAt = response.data.expires_in * 1000 + new Date().getTime();
      localStorage.setItem('expires_at', expiresAt);
    }
    return response.data;
  },
  register: async (email, password) => {
    const optionsToRegister = {
      url: `${API_URL}/api/private/accounts`,
      method: 'POST',
      data: { email, password },
      headers: { 'content-type': 'application/json' },
    };
    return await axios(optionsToRegister);
  },
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expires_at');
  },
  getCurrentUser: () => {
    if (AuthService.isAuthenticated()) {
      return JSON.parse(localStorage.getItem('user'));
    } else return null;
  },
  isAuthenticated: () => {
    const expiresAt = localStorage.getItem('expires_at');
    return expiresAt > new Date().getTime();
  },
};
export default AuthService;
