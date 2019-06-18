import { userService } from '../services/userService';
import {
  REQUEST_IN_PROGRESS_CONFIRM_SIGN_UP,
  REQUEST_IN_PROGRESS_CONFIRMED_SIGN_UP,
  SUCCESSFULLY_CONFIRMED_SIGN_UP,
  SET_CONFIRM_SIGN_UP_ERRORS,
} from '../constants/confirm-sign-up';

export const requestInProgress = (isRequestInProgress = true) => {
  if (isRequestInProgress) {
    return {
      type: REQUEST_IN_PROGRESS_CONFIRM_SIGN_UP,
    };
  }
  return {
    type: REQUEST_IN_PROGRESS_CONFIRMED_SIGN_UP,
  };
};

export const successfullyConfirmed = () => ({
  type: SUCCESSFULLY_CONFIRMED_SIGN_UP,
});

export const setErrors = errors => ({
  type: SET_CONFIRM_SIGN_UP_ERRORS,
  payload: errors,
});

export const confirmSignUp = token => (dispatch) => {
  dispatch(requestInProgress());
  return userService.confirmSignUp(token).then(async (res) => {
    await dispatch(successfullyConfirmed(res.data));
  }).catch(async (err) => {
    if (err.response && err.response.data.errors) {
      dispatch(setErrors(err.response.data.errors));
    } else {
      dispatch(setErrors(['Error confirming! The verification link expired.']));
    }
  }).finally(() => dispatch(requestInProgress(false)));
};
