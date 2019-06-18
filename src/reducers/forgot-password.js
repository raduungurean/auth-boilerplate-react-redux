import {
  REQUEST_IN_PROGRESS_FORGOT_PASSWORD,
  REQUEST_IN_PROGRESS_FORGOT_PASSWORD_DONE,
  SENT_RECOVER_PASSWORD_REQUEST,
  SET_RECOVER_PASSWORD_ERRORS,
} from '../constants/forgot-password';

const INITIAL_STATE = {
  requestInProgress: false,
  errors: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SENT_RECOVER_PASSWORD_REQUEST: {
      return {
        ...INITIAL_STATE,
      };
    }

    case REQUEST_IN_PROGRESS_FORGOT_PASSWORD: {
      return {
        ...state,
        requestInProgress: true,
      };
    }

    case REQUEST_IN_PROGRESS_FORGOT_PASSWORD_DONE: {
      return {
        ...state,
        requestInProgress: false,
      };
    }

    case SET_RECOVER_PASSWORD_ERRORS: {
      return {
        ...state,
        errors: action.payload,
      };
    }

    default:
      return state;
  }
}
