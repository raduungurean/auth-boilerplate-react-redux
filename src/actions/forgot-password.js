import { push } from 'connected-react-router';
import { userService } from '../services/userService';
import {
  REQUEST_IN_PROGRESS_FORGOT_PASSWORD,
  REQUEST_IN_PROGRESS_FORGOT_PASSWORD_DONE,
  SENT_RECOVER_PASSWORD_REQUEST,
  SET_RECOVER_PASSWORD_ERRORS,
} from '../constants/forgot-password';

export const setErrors = errors => ({
  type: SET_RECOVER_PASSWORD_ERRORS,
  payload: errors,
});

export const requestInProgress = (isRequestInProgress = true) => {
  if (isRequestInProgress) {
    return {
      type: REQUEST_IN_PROGRESS_FORGOT_PASSWORD,
    };
  }
  return {
    type: REQUEST_IN_PROGRESS_FORGOT_PASSWORD_DONE,
  };
};

export const sentRecoverRequest = () => ({
  type: SENT_RECOVER_PASSWORD_REQUEST,
});

export const recoverPasswordRequest = email => (dispatch) => {
  dispatch(requestInProgress());
  return userService.sendPasswordRecover(email).then(async (res) => {
    await dispatch(sentRecoverRequest(res.data));
    await dispatch(push('/'));
  }).catch(async (err) => {
    if (err.response && err.response.data.errors) {
      dispatch(setErrors(err.response.data.errors));
    } else {
      dispatch(setErrors(['error']));
    }
  }).finally(() => dispatch(requestInProgress(false)));
};
