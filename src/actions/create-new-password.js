import { push } from 'connected-react-router';
import { userService } from '../services/userService';
import {
  REQUEST_IN_PROGRESS_CHECKED_TOKEN,
  REQUEST_IN_PROGRESS_CHECKING_TOKEN,
  REQUEST_IN_PROGRESS_CREATED_NEW_PASSWORD,
  REQUEST_IN_PROGRESS_CREATING_NEW_PASSWORD,
  ERROR_CREATING_PASSWORD,
  INVALID_PASSWORD_TOKEN,
  SUCCESSFULLY_CREATED_PASSWORD,
  VALID_PASSWORD_TOKEN,
  CREATE_PASSWORD_SET_ERRORS,
} from '../constants/create-new-password';

export const tokenValid = () => ({
  type: VALID_PASSWORD_TOKEN,
});

export const tokenInvalid = () => ({
  type: INVALID_PASSWORD_TOKEN,
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

export const errorCreatingPassword = () => ({
  type: ERROR_CREATING_PASSWORD,
});

const setErrors = errors => ({
  type: CREATE_PASSWORD_SET_ERRORS,
  payload: errors,
});

export const checkCreateNewPasswordToken = token => (dispatch) => {
  dispatch(requestInProgress('checking'));
  return userService.checkCreateNewPasswordToken(token).then(async (res) => {
    dispatch(tokenValid());
  }).catch(async (err) => {
    dispatch(tokenInvalid());
  }).finally(() => dispatch(requestInProgress('checked')));
};

export const createNewPassword = (password, passwordConfirmation, token) => (dispatch) => {
  dispatch(requestInProgress('creating'));
  return userService.createNewPassword(password, passwordConfirmation, token).then(async (res) => {
    await dispatch(successfullyCreated());
    await dispatch(push('/'));
  }).catch(async (err) => {
    dispatch(errorCreatingPassword());
    if (err.response && err.response.data.errors) {
      dispatch(setErrors(err.response.data.errors));
    }
  }).finally(() => dispatch(requestInProgress('created')));
};
