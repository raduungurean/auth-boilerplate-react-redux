import {
  RESET_ALL_ERRORS, RESET_ERRORS, RESET_ERRORS_EXCEPT, SET_ERRORS,
} from '../constants/errors';

const INITIAL_STATE = {
  errors: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_ERRORS: {
      return {
        ...INITIAL_STATE,
        errors: {
          [action.payload.screen]: action.payload.errors,
        },
      };
    }

    case RESET_ERRORS_EXCEPT: {
      if (state.errors[action.payload]) {
        return {
          errors: {
            [action.payload]: state.errors[action.payload],
          },
        };
      }

      return {
        ...INITIAL_STATE,
      };
    }

    case RESET_ERRORS: {
      if (state.errors[action.payload.screen]) {
        const newErrors = Object.keys(state.errors).reduce((object, key) => {
          if (key !== action.payload.screen) {
            object[key] = state.errors[key];
          }
          return object;
        }, {});

        return {
          ...INITIAL_STATE,
          errors: newErrors,
        };
      }

      return state;
    }

    case RESET_ALL_ERRORS: {
      return {
        ...INITIAL_STATE,
      };
    }

    default:
      return state;
  }
}
