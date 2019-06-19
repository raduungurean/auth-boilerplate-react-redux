import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { recoverPasswordRequest, sentRecoverRequest } from '../../actions/forgot-password';
import {
  REQUEST_IN_PROGRESS_FORGOT_PASSWORD,
  REQUEST_IN_PROGRESS_FORGOT_PASSWORD_DONE,
  SENT_RECOVER_PASSWORD_REQUEST,
} from '../../constants/forgot-password';

test('should sent forgot password request', () => {
  const action = sentRecoverRequest();
  expect(action).toEqual({
    type: SENT_RECOVER_PASSWORD_REQUEST,
  });
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('forgot password', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  test('should send forgot password request', () => {
    const email = 'test@test.com';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {},
      });
    });

    const expectedActions = [{
      type: REQUEST_IN_PROGRESS_FORGOT_PASSWORD,
    }, {
      type: SENT_RECOVER_PASSWORD_REQUEST,
    }, {
      type: '@@router/CALL_HISTORY_METHOD',
      payload: {
        args: ['/'],
        method: 'push',
      },
    }, {
      type: REQUEST_IN_PROGRESS_FORGOT_PASSWORD_DONE,
    }];

    const store = mockStore({ auth: {} });

    return store.dispatch(recoverPasswordRequest(email)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
