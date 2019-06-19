import { userService } from '../services/userService';
import {
  REQUEST_IN_PROGRESS_CHECKED_TOKEN,
  REQUEST_IN_PROGRESS_CHECKING_TOKEN,
  REQUEST_IN_PROGRESS_CREATED_NEW_PASSWORD,
  REQUEST_IN_PROGRESS_CREATING_NEW_PASSWORD,
  SUCCESSFULLY_CREATED_PASSWORD,
  VALID_PASSWORD_TOKEN,
} from '../constants/create-new-password';
import { handleErrors } from './errors';

export const tokenValid = () => ({
  type: VALID_PASSWORD_TOKEN,
});

export const requestInProgress = (type) => {
  if (type === 'creating') {
    return {
      type: REQUEST_IN_PROGRESS_CREATING_NEW_PASSWORD,
    };
  }
  if (type === 'created') {
    return {
      type: REQUEST_IN_PROGRESS_CREATED_NEW_PASSWORD,
    };
  }

  if (type === 'checking') {
    return {
      type: REQUEST_IN_PROGRESS_CHECKING_TOKEN,
    };
  }

  if (type === 'checked') {
    return {
      type: REQUEST_IN_PROGRESS_CHECKED_TOKEN,
    };
  }

  return null;
};

export const successfullyCreated = () => ({
  type: SUCCESSFULLY_CREATED_PASSWORD,
});

export const checkCreateNewPasswordToken = token => (dispatch) => {
  dispatch(requestInProgress('checking'));
  return userService.checkCreateNewPasswordToken(token).then(async (res) => {
    dispatch(tokenValid());
  }).catch(async (err) => {

  }).finally(() => dispatch(requestInProgress('checked')));
};

export const createNewPassword = (password, passwordConfirmation, token) => (dispatch) => {
  dispatch(requestInProgress('creating'));
  return userService.createNewPassword(password, passwordConfirmation, token).then(async (res) => {
    await dispatch(successfullyCreated());
  }).catch(async (err) => {
    dispatch(handleErrors('create-new-password', 'Error creating new password.', err));
  }).finally(() => dispatch(requestInProgress('created')));
};
