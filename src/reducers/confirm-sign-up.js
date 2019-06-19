import {
  REQUEST_IN_PROGRESS_CONFIRM_SIGN_UP,
  REQUEST_IN_PROGRESS_CONFIRMED_SIGN_UP,
  SUCCESSFULLY_CONFIRMED_SIGN_UP,
} from '../constants/confirm-sign-up';

const INITIAL_STATE = {
  requestInProgress: false,
  confirmed: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUCCESSFULLY_CONFIRMED_SIGN_UP: {
      return {
        ...INITIAL_STATE,
        confirmed: true,
      };
    }

    case REQUEST_IN_PROGRESS_CONFIRM_SIGN_UP: {
      return {
        ...state,
        requestInProgress: true,
      };
    }

    case REQUEST_IN_PROGRESS_CONFIRMED_SIGN_UP: {
      return {
        ...state,
        requestInProgress: false,
      };
    }

    default:
      return state;
  }
}
