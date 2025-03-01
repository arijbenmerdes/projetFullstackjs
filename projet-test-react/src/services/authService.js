import axios from 'axios';
const API_URL = 'http://localhost:3000';

const signup = (username, password, email) => {
    return axios.post(`${API_URL}/auth/signup`, { username, password, email });
};

const login = (email, password) => {
    return axios.post(`${API_URL}/auth/login`, { email, password });
};
const setup2FA = (token) => {
    return axios.post(`${API_URL}/auth/2fa-setup`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };
  
  const verify2FA = (token, twoFactorToken) => {
    console.log("Données envoyées :", { token: twoFactorToken });
    return axios.post(`${API_URL}/auth/2fa-verify`, { token: twoFactorToken }, {
      headers: { Authorization: `Bearer ${token}` }
    });
};

export default {
    signup,
    login,
    setup2FA,
    verify2FA
}