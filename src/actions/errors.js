import { push } from 'connected-react-router';
import { userService } from '../services/userService';
import { AUTH_LOGOUT } from '../constants/auth';
import { SET_ERRORS, RESET_ERRORS_EXCEPT, RESET_ERRORS } from '../constants/errors';

export const setErrors = (screen, errors) => ({
  type: SET_ERRORS,
  payload: {
    errors,
    screen,
  },
});

export const resetErrorsExcept = except => ({
  type: RESET_ERRORS_EXCEPT,
  payload: except,
});

export const resetErrorsForScreen = screen => ({
  type: RESET_ERRORS,
  payload: {
    screen,
  },
});

export const handleErrors = (screen, specificErrorMessage, err) => async (dispatch) => {
  if (err.response && err.response.status) {
    // if unauthorized, logout
    if (err.response.status === 401 && screen !== 'sign-in') {
      userService.clearLocalStorage();
      await dispatch({
        type: AUTH_LOGOUT,
      });
      await dispatch(push('/'));
    } else if (err.response && err.response.data.errors) {
      dispatch(setErrors(screen, err.response.data.errors));
    } else {
      dispatch(setErrors(screen, { error: specificErrorMessage }));
    }
  }
};
