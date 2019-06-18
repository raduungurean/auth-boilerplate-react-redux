import axios from 'axios';
import config from '../config';
import { validateEmail } from './utils';

function login(username, password) {
  return new Promise((resolve, reject) => {
    const loginData = {
      ...(validateEmail(username) ? { email: username } : { username }),
      password,
    };
    axios.post(`${config.API_URL}/auth/login`, loginData).then((response) => {
      resolve(response);
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
    }).catch(err => reject(err));
  });
}

function clearLocalStorage() {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userData');
}

async function logout(getState) {
  return new Promise(async (resolve, reject) => {
    const currentState = await getState();
    const { token } = currentState.auth;
    axios.post(`${config.API_URL}/auth/logout`, {}, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      resolve(response);
      clearLocalStorage();
    }).catch(err => reject(err));
  });
}

async function signUp(registerData) {
  return new Promise(async (resolve, reject) => {
    axios.post(`${config.API_URL}/sign-up`, registerData)
      .then(async (response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
  });
}

async function sendPasswordRecover(email) {
  return new Promise(async (resolve, reject) => {
    axios.post(`${config.API_URL}/forgot-password`, { email })
      .then(async (response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
  });
}

async function createNewPassword(password, passwordConfirmation, token) {
  return new Promise(async (resolve, reject) => {
    axios.post(`${config.API_URL}/create-new-password`, { password, password_confirmation: passwordConfirmation, token })
      .then(async (response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
  });
}

async function checkCreateNewPasswordToken(token) {
  return new Promise(async (resolve, reject) => {
    axios.get(`${config.API_URL}/check-create-new-password-token/${token}`)
      .then(async (response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
  });
}

async function confirmSignUp(token) {
  return new Promise(async (resolve, reject) => {
    axios.get(`${config.API_URL}/confirm-signup/${token}`)
      .then(async (response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
  });
}

async function socialiteLogin(data, provider) {
  return new Promise((resolve, reject) => {
    axios.post(`${config.OAUTH_HANDLE_URL}/${provider}${data}`, {}, {
    }).then(async (response) => {
      resolve(response);
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
    }).catch(err => reject(err));
  });
}

export const userService = {
  login,
  logout,
  sendPasswordRecover,
  createNewPassword,
  clearLocalStorage,
  confirmSignUp,
  checkCreateNewPasswordToken,
  socialiteLogin,
  signUp,
};
