import {
  AUTH_LOGGED_IN,
  AUTH_REQUEST_IN_PROGRESS_START,
  AUTH_LOGOUT,
  AUTH_REQUEST_IN_PROGRESS_END,
  RESET_SIGN_IN,
} from '../constants/auth';

const INITIAL_STATE = {
  user: null,
  token: null,
  requestInProgress: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_LOGOUT: {
      return {
        ...INITIAL_STATE,
      };
    }
    case AUTH_REQUEST_IN_PROGRESS_START:
      return {
        ...state,
        requestInProgress: true,
      };

    case AUTH_REQUEST_IN_PROGRESS_END:
      return {
        ...state,
        requestInProgress: false,
      };

    case AUTH_LOGGED_IN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case RESET_SIGN_IN: {
      return {
        ...INITIAL_STATE,
      };
    }

    default:
      return state;
  }
}
