import { userService } from '../services/userService';
import {
  REGISTERED,
  REQUESTS_IN_PROGRESS_REGISTER,
  REQUESTS_IN_PROGRESS_REGISTERED,
  RESET_REGISTRATION,
} from '../constants/sign-up';
import { handleErrors } from './errors';

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

export const registered = data => ({
  type: REGISTERED,
});

export const resetState = () => ({
  type: RESET_REGISTRATION,
});

export const signUp = user => (dispatch) => {
  dispatch(requestInProgress());
  return userService.signUp(user).then(async (res) => {
    await dispatch(registered(res.data));
  }).catch(async (err) => {
    dispatch(handleErrors('sign-up', 'Error signing up.', err));
  }).finally(() => dispatch(requestInProgress(false)));
};
