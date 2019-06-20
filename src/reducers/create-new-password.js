import {
  REQUEST_IN_PROGRESS_CHECKED_TOKEN,
  REQUEST_IN_PROGRESS_CHECKING_TOKEN,
  REQUEST_IN_PROGRESS_CREATED_NEW_PASSWORD,
  REQUEST_IN_PROGRESS_CREATING_NEW_PASSWORD,
  SUCCESSFULLY_CREATED_PASSWORD,
  VALID_PASSWORD_TOKEN,
  RESET_CREATE_PASSWORD_STATE,
} from '../constants/create-new-password';

const INITIAL_STATE = {
  checkingTokenRequestInProgress: true,
  valid: false,
  creatingPasswordRequestInProgress: false,
  success: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_IN_PROGRESS_CHECKING_TOKEN: {
      return {
        ...INITIAL_STATE,
      };
    }

    case REQUEST_IN_PROGRESS_CREATED_NEW_PASSWORD:
      return {
        ...state,
        creatingPasswordRequestInProgress: false,
      };

    case SUCCESSFULLY_CREATED_PASSWORD:
      return {
        ...state,
        success: true,
      };

    case REQUEST_IN_PROGRESS_CREATING_NEW_PASSWORD:
      return {
        ...state,
        creatingPasswordRequestInProgress: true,
      };

    case RESET_CREATE_PASSWORD_STATE:

      return {
        ...INITIAL_STATE,
        checkingTokenRequestInProgress: state.checkingTokenRequestInProgress,
        valid: state.valid,
      };

    case VALID_PASSWORD_TOKEN: {
      return {
        ...state,
        valid: true,
      };
    }

    case REQUEST_IN_PROGRESS_CHECKED_TOKEN: {
      return {
        ...state,
        checkingTokenRequestInProgress: false,
      };
    }

    default:
      return state;
  }
}
