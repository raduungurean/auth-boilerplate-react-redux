import { composeWithDevTools } from 'redux-devtools-extension';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import authReducer from './auth';
import layoutReducer from './layout';
import signUpReducer from './sign-up';
import forgotPasswordReducer from './forgot-password';
import createNewPasswordReducer from './create-new-password';
import confirmSignUpReducer from './confirm-sign-up';

const reducers = history => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  layout: layoutReducer,
  signUp: signUpReducer,
  forgotPassword: forgotPasswordReducer,
  createNewPassword: createNewPasswordReducer,
  confirmSignUp: confirmSignUpReducer,
});

export const history = createBrowserHistory();

const middleware = [thunk, routerMiddleware(history)];

const store = createStore(
  reducers(history),
  {},
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
