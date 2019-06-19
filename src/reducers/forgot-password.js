import {
  REQUEST_IN_PROGRESS_FORGOT_PASSWORD,
  REQUEST_IN_PROGRESS_FORGOT_PASSWORD_DONE,
  SENT_RECOVER_PASSWORD_REQUEST,
} from '../constants/forgot-password';

const INITIAL_STATE = {
  requestInProgress: false,
  success: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SENT_RECOVER_PASSWORD_REQUEST: {
      return {
        ...INITIAL_STATE,
        success: true,
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

    default:
      return state;
  }
}
