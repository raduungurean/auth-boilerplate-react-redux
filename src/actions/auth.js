import { push } from 'connected-react-router';
import {
  AUTH_REQUEST_IN_PROGRESS_START,
  AUTH_LOGGED_IN,
  AUTH_LOGOUT,
  AUTH_REQUEST_IN_PROGRESS_END,
  RESET_SIGN_IN,
} from '../constants/auth';
import { userService } from '../services/userService';
import { handleErrors } from './errors';

export const loggedIn = data => ({
  type: AUTH_LOGGED_IN,
  payload: data,
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

export const resetState = () => ({
  type: RESET_SIGN_IN,
});

export const logout = () => (dispatch, getState) => userService.logout(getState).then((res) => {
  dispatch(loggedOut());
}).catch((err) => {
  dispatch(handleErrors('sign-in', 'Error logging out.', err));
});

export const login = (username, password) => (dispatch) => {
  dispatch(requestInProgress());
  return userService.login(username, password).then(async (res) => {
    await dispatch(loggedIn(res.data));
    await dispatch(push('/'));
  }).catch(async (err) => {
    dispatch(handleErrors('sign-in', 'Error logging in.', err));
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
    dispatch(handleErrors('sign-in', 'Error logging in.', err));
  }).finally(() => dispatch(requestInProgress(false)));
};
