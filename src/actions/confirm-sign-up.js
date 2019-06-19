import { userService } from '../services/userService';
import {
  REQUEST_IN_PROGRESS_CONFIRM_SIGN_UP,
  REQUEST_IN_PROGRESS_CONFIRMED_SIGN_UP,
  SUCCESSFULLY_CONFIRMED_SIGN_UP,
} from '../constants/confirm-sign-up';
import { handleErrors } from './errors';

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

export const confirmSignUp = token => (dispatch) => {
  dispatch(requestInProgress());
  return userService.confirmSignUp(token).then(async (res) => {
    await dispatch(successfullyConfirmed(res.data));
  }).catch(async (err) => {
    dispatch(handleErrors('confirm-sign-up', 'Error confirming.', err));
  }).finally(() => dispatch(requestInProgress(false)));
};
