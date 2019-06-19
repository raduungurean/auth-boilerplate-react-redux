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

const INITIAL_STATE = {
  checkingTokenRequestInProgress: true,
  valid: false,
  creatingPasswordRequestInProgress: false,
  successfullyCreated: false,
  errors: [],
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

    case ERROR_CREATING_PASSWORD:
      return {
        ...state,
        successfullyCreated: false,
      };

    case SUCCESSFULLY_CREATED_PASSWORD:
      return {
        ...state,
        successfullyCreated: true,
        errors: [],
      };

    case REQUEST_IN_PROGRESS_CREATING_NEW_PASSWORD:
      return {
        ...state,
        errors: [],
        creatingPasswordRequestInProgress: true,
      };

    case VALID_PASSWORD_TOKEN: {
      return {
        ...state,
        valid: true,
      };
    }

    case INVALID_PASSWORD_TOKEN: {
      return {
        ...state,
        valid: false,
      };
    }

    case CREATE_PASSWORD_SET_ERRORS: {
      return {
        ...state,
        errors: action.payload,
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
