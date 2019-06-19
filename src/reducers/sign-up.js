import {
  REGISTERED,
  REQUESTS_IN_PROGRESS_REGISTER,
  REGISTRATION_ERROR,
  SET_REGISTRATION_ERRORS,
  REQUESTS_IN_PROGRESS_REGISTERED,
  RESET_REGISTRATION,
} from '../constants/sign-up';

const INITIAL_STATE = {
  requestInProgress: false,
  registered: false,
  registrationError: undefined,
  errors: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REGISTERED: {
      return {
        ...state,
        registered: true,
      };
    }
    case REQUESTS_IN_PROGRESS_REGISTER: {
      return {
        ...state,
        errors: [],
        registrationError: undefined,
        requestInProgress: true,
      };
    }

    case REQUESTS_IN_PROGRESS_REGISTERED: {
      return {
        ...state,
        requestInProgress: false,
      };
    }

    case REGISTRATION_ERROR: {
      return {
        ...state,
        registered: false,
        registrationError: action.payload,
      };
    }
    case SET_REGISTRATION_ERRORS: {
      return {
        ...state,
        errors: action.payload,
      };
    }

    case RESET_REGISTRATION: {
      return {
        ...INITIAL_STATE,
      };
    }

    default:
      return state;
  }
}
