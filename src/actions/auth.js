import { push } from 'connected-react-router';
import {
  AUTH_REQUEST_IN_PROGRESS_START,
  AUTH_LOGGED_IN,
  AUTH_ERR_LOG_IN,
  AUTH_LOGOUT, AUTH_REQUEST_IN_PROGRESS_END,
} from '../constants/auth';
import { userService } from '../services/userService';
import { errorParser } from '../services/apiErrorParser';
import { handleError } from './errors';

export const loggedIn = data => ({
  type: AUTH_LOGGED_IN,
  payload: data,
});

export const errorLogIn = errorMessage => ({
  type: AUTH_ERR_LOG_IN,
  payload: errorMessage,
});

export const requestInProgress = (isRequestInProgress = true) => {
  if (isRequestInProgress) {
    return {
      type: AUTH_REQUEST_IN_PROGRESS_START,
    };
  }
  return {
    type: AUTH_REQUEST_IN_PROGRESS_END,
  };
};

export const loggedOut = () => ({
  type: AUTH_LOGOUT,
});

export const logout = () => (dispatch, getState) => userService.logout(getState).then((res) => {
  dispatch(loggedOut());
}).catch((err) => {
  dispatch(handleError(err));
});

export const login = (username, password) => (dispatch) => {
  dispatch(requestInProgress());
  return userService.login(username, password).then(async (res) => {
    await dispatch(loggedIn(res.data));
    await dispatch(push('/'));
  }).catch(async (err) => {
    await dispatch(errorLogIn(errorParser.parseLoginError(err).message));
    await dispatch(push('/'));
  }).finally(() => {
    dispatch(requestInProgress(false));
  });
};

export const socialiteLogin = (data, provider) => (dispatch) => {
  dispatch(requestInProgress());
  return userService.socialiteLogin(data, provider).then(async (res) => {
    await dispatch(loggedIn(res.data));
    await dispatch(push('/'));
  }).catch(async (err) => {
    await dispatch(errorLogIn('Authentication failed.'));
    await dispatch(push('/'));
  }).finally(() => dispatch(requestInProgress(false)));
};
