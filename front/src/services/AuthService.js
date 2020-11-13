import axios from 'axios';
import queryString from 'query-string';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const TOKEN_END_POINT = process.env.REACT_APP_TOKEN_END_POINT;
const ACCOUNTS_END_POINT = process.env.REACT_APP_ACCOUNTS_END_POINT;
const URL_ENCODED = process.env.REACT_APP_HEADER_URL_ENCODED;
const HEADER_JSON = process.env.REACT_APP_HEADER_JSON;
const LOCAL_STORAGE_USER = process.env.REACT_APP_LOCAL_STORAGE_USER;
const LOCAL_STORAGE_EXPIRES_AT = process.env.REACT_APP_LOCAL_STORAGE_EXPIRES_AT;

const AuthService = {
  login: async (email, password) => {
    const optionsToLogin = {
      url: `${API_BASE_URL}${TOKEN_END_POINT}`,
      method: 'POST',
      data: queryString.stringify({
        username: email,
        password: password,
        client_id: process.env.REACT_APP_CLIENT_ID,
        grant_type: process.env.REACT_APP_GRANT_TYPE,
      }),
      headers: { 'content-type': URL_ENCODED },
    };
    const response = await axios(optionsToLogin);
    if (response.data.access_token) {
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(response.data));
      const expiresAt = response.data.expires_in * 1000 + new Date().getTime();
      localStorage.setItem(LOCAL_STORAGE_EXPIRES_AT, expiresAt);
    }
    return response.data;
  },
  register: async (email, password) => {
    const optionsToRegister = {
      url: `${API_BASE_URL}${ACCOUNTS_END_POINT}`,
      method: 'POST',
      data: { email, password },
      headers: { 'content-type': HEADER_JSON },
    };
    return await axios(optionsToRegister);
  },
  logout: () => {
    localStorage.removeItem(LOCAL_STORAGE_USER);
    localStorage.removeItem(LOCAL_STORAGE_EXPIRES_AT);
  },
  getCurrentUser: () => {
    if (AuthService.isAuthenticated()) {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
    } else return null;
  },
  isAuthenticated: () => {
    const expiresAt = localStorage.getItem(LOCAL_STORAGE_EXPIRES_AT);
    return expiresAt > new Date().getTime();
  },
};
export default AuthService;
