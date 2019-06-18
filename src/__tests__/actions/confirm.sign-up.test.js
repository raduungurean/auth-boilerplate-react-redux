import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  REQUEST_IN_PROGRESS_CONFIRM_SIGN_UP,
  REQUEST_IN_PROGRESS_CONFIRMED_SIGN_UP, SET_CONFIRM_SIGN_UP_ERRORS,
  SUCCESSFULLY_CONFIRMED_SIGN_UP,
} from '../../constants/confirm-sign-up';
import { confirmSignUp, requestInProgress, successfullyConfirmed } from '../../actions/confirm-sign-up';

test('should set request in progress', () => {
  const action = requestInProgress();
  expect(action).toEqual({
    type: REQUEST_IN_PROGRESS_CONFIRM_SIGN_UP,
  });
});

test('should end request in progress', () => {
  const action = requestInProgress(false);
  expect(action).toEqual({
    type: REQUEST_IN_PROGRESS_CONFIRMED_SIGN_UP,
  });
});

test('should set successfully confirmed', () => {
  const action = successfullyConfirmed();
  expect(action).toEqual({
    type: SUCCESSFULLY_CONFIRMED_SIGN_UP,
  });
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('confirm sign up test', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('should confirm', () => {
    const expectToken = 'the-token';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {},
      });
    });

    const expectedActions = [{
      type: REQUEST_IN_PROGRESS_CONFIRM_SIGN_UP,
    }, {
      type: SUCCESSFULLY_CONFIRMED_SIGN_UP,
    }, {
      type: REQUEST_IN_PROGRESS_CONFIRMED_SIGN_UP,
    }];

    const store = mockStore({ auth: {} });

    return store.dispatch(confirmSignUp(expectToken)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should fail', () => {
    const expectToken = 'the-token';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {},
      });
    });

    const expectedActions = [{
      type: REQUEST_IN_PROGRESS_CONFIRM_SIGN_UP,
    }, {
      type: SET_CONFIRM_SIGN_UP_ERRORS,
      payload: [
        'Error confirming! The verification link expired.',
      ],
    }, {
      type: REQUEST_IN_PROGRESS_CONFIRMED_SIGN_UP,
    }];

    const store = mockStore({ auth: {} });

    return store.dispatch(confirmSignUp(expectToken)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
