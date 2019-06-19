import { userService } from '../services/userService';
import {
  REQUEST_IN_PROGRESS_FORGOT_PASSWORD,
  REQUEST_IN_PROGRESS_FORGOT_PASSWORD_DONE,
  SENT_RECOVER_PASSWORD_REQUEST,
} from '../constants/forgot-password';
import { handleErrors } from './errors';

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
  }).catch(async (err) => {
    dispatch(handleErrors('forgot-password', 'Error sending request.', err));
  }).finally(() => dispatch(requestInProgress(false)));
};
