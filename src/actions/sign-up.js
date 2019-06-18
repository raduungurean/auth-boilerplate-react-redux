import { push } from 'connected-react-router';
import { userService } from '../services/userService';
import {
  REGISTERED,
  REQUESTS_IN_PROGRESS_REGISTER,
  REGISTRATION_ERROR,
  SET_REGISTRATION_ERRORS,
  REQUESTS_IN_PROGRESS_REGISTERED,
} from '../constants/sign-up';

export const requestInProgress = (isRequestInProgress = true) => {
  if (isRequestInProgress) {
    return {
      type: REQUESTS_IN_PROGRESS_REGISTER,
    };
  }
  return {
    type: REQUESTS_IN_PROGRESS_REGISTERED,
  };
};

export const registered = (data) => ({
  type: REGISTERED,
});

export const errorRegistering = errorMessage => ({
  type: REGISTRATION_ERROR,
  payload: errorMessage,
});

export const setErrors = errors => ({
  type: SET_REGISTRATION_ERRORS,
  payload: errors,
});

export const signUp = user => (dispatch) => {
  dispatch(requestInProgress());
  return userService.signUp(user).then(async (res) => {
    await dispatch(registered(res.data));
    await dispatch(push('/'));
  }).catch(async (err) => {
    if (err.response && err.response.data.errors) {
      dispatch(setErrors(err.response.data.errors));
    }
    await dispatch(errorRegistering(undefined));
  }).finally(() => dispatch(requestInProgress(false)));
};
