import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import {
  AUTH_ERR_LOG_IN,
  AUTH_LOGGED_IN,
  AUTH_REQUEST_IN_PROGRESS_START,
  AUTH_LOGOUT, AUTH_REQUEST_IN_PROGRESS_END,
} from '../../constants/auth';
import {
  errorLogIn, loggedIn, login, loggedOut, requestInProgress,
} from '../../actions/auth';

test('should login the user', () => {
  const expectToken = 'the token';
  const userInfo = {
    user: {},
    token: expectToken,
  };
  const action = loggedIn(userInfo);
  expect(action).toEqual({
    type: AUTH_LOGGED_IN,
    payload: {
      user: {},
      token: expectToken,
    },
  });
});

test('should logout the user', () => {
  const action = loggedOut();
  expect(action).toEqual({
    type: AUTH_LOGOUT,
  });
});

test('should return login error', () => {
  const expectErrorMessage = 'Wrong username or password';
  const action = errorLogIn(expectErrorMessage);
  expect(action).toEqual({
    type: AUTH_ERR_LOG_IN,
    payload: expectErrorMessage,
  });
});

test('should set logging in flag', () => {
  const action = requestInProgress();
  expect(action).toEqual({
    type: AUTH_REQUEST_IN_PROGRESS_START,
  });
});

test('should unset logging in flag', () => {
  const action = requestInProgress(false);
  expect(action).toEqual({
    type: AUTH_REQUEST_IN_PROGRESS_END,
  });
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('login tests', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('should login successfully user', () => {
    const expectToken = 'the token';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          user: {},
          token: expectToken,
        },
      });
    });

    const expectedActions = [
      { type: AUTH_REQUEST_IN_PROGRESS_START },
      {
        type: AUTH_LOGGED_IN,
        payload: {
          user: {},
          token: expectToken,
        },
      },
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: { args: ['/'], method: 'push' },
      },
      { type: AUTH_REQUEST_IN_PROGRESS_END },
    ];

    const store = mockStore({ auth: {} });

    return store.dispatch(login('user', 'userpass')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should throw error when auth fails', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: { payload: 'authentication error' },
      });
    });

    const expectedActions = [
      { type: AUTH_REQUEST_IN_PROGRESS_START },
      {
        type: AUTH_ERR_LOG_IN,
        payload: 'authentication error',
      },
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: { args: ['/'], method: 'push' },
      },
      { type: AUTH_REQUEST_IN_PROGRESS_END },
    ];

    const store = mockStore({ auth: {} });

    return store.dispatch(login('user', 'userpass')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
