import {
  REQUEST_IN_PROGRESS_CONFIRM_SIGN_UP,
  REQUEST_IN_PROGRESS_CONFIRMED_SIGN_UP,
  SUCCESSFULLY_CONFIRMED_SIGN_UP,
  SET_CONFIRM_SIGN_UP_ERRORS,
} from '../constants/confirm-sign-up';

const INITIAL_STATE = {
  requestInProgress: false,
  errors: [],
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
        errors: [],
        requestInProgress: true,
      };
    }

    case REQUEST_IN_PROGRESS_CONFIRMED_SIGN_UP: {
      return {
        ...state,
        requestInProgress: false,
      };
    }

    case SET_CONFIRM_SIGN_UP_ERRORS: {
      return {
        ...state,
        errors: action.payload,
      };
    }

    default:
      return state;
  }
}
