import {
  REGISTERED,
  REQUESTS_IN_PROGRESS_REGISTER,
  REQUESTS_IN_PROGRESS_REGISTERED,
  RESET_REGISTRATION,
} from '../constants/sign-up';

const INITIAL_STATE = {
  requestInProgress: false,
  registered: false,
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
        requestInProgress: true,
      };
    }

    case REQUESTS_IN_PROGRESS_REGISTERED: {
      return {
        ...state,
        requestInProgress: false,
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
