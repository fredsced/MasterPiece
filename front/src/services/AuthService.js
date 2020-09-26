import axios from 'axios';
import queryString from 'query-string';

class AuthService {
  login(email, password) {
    const optionsToLogin = {
      url: `${process.env.REACT_APP_SERVER_URL}/oauth/token`,
      method: 'POST',
      data: queryString.stringify({
        username: email,
        password: password,
        client_id: process.env.REACT_APP_CLIENT_ID,
        grant_type: 'password',
      }),
      header: { 'content-type': 'application/x-www-form-urlencoded' },
    };
    return axios(optionsToLogin).then((response) => {
      if (response.data.access_token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
  }
  register(email, password) {
    const optionsToRegister = {
      url: `${process.env.REACT_APP_SERVER_URL}/api/private/accounts`,
      method: 'POST',
      data: { email, password },
      headers: { 'content-type': 'application/json' },
    };
    return axios(optionsToRegister);
  }
  logout() {
    localStorage.removeItem('user');
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
export default new AuthService();
