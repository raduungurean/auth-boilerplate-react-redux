import authReducer from '../../reducers/auth';
import { AUTH_ERR_LOG_IN, AUTH_REQUEST_IN_PROGRESS_START, AUTH_LOGOUT } from '../../constants/auth';

describe('auth reducer', () => {
  const INITIAL_STATE = {
    user: null,
    token: null,
    requestInProgress: false,
    errorMessage: '',
  };

  test('should setup the initial data', () => {
    const state = authReducer(undefined, {
      type: '@@INIT',
    });

    expect(state).toEqual(INITIAL_STATE);
  });

  test('should set loggingIn', () => {
    const state = authReducer(undefined, { type: AUTH_REQUEST_IN_PROGRESS_START });
    expect(state).toHaveProperty('requestInProgress', true);
  });

  test('should set error message', () => {
    const state = authReducer(undefined, { type: AUTH_ERR_LOG_IN, payload: 'errMsg' });
    expect(state).toHaveProperty('errorMessage', 'errMsg');
  });

  test('should logout user', () => {
    const currentState = {
      user: {},
      token: 'a token',
      requestInProgress: false,
      errorMessage: '',
    };

    const state = authReducer(currentState, {
      type: AUTH_LOGOUT,
    });

    expect(state).toEqual(INITIAL_STATE);
  });
});
