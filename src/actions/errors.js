import { userService } from '../services/userService';
import { AUTH_LOGOUT } from '../constants/auth';

export const handleError = err => (dispatch) => {
  if (err.response && err.response.status) {
    if (err.response.status === 401) {
      userService.clearLocalStorage();
      dispatch({
        type: AUTH_LOGOUT,
      });
    }
  }
};
