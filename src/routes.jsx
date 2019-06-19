import React from 'react';
import { Route } from 'react-router-dom';
import Home from './containers/home/Home';
import Socialite from './containers/socialite/Socialite';
import Logout from './containers/auth/Logout';
import ProtectedRoute from './containers/auth/ProtectedRoute';
import Register from './containers/sign-up/SignUp';
import ForgotPassword from './containers/forgot-password/ForgotPassword';
import CreateNewPassword from './containers/create-new-password/CreateNewPassword';
import ConfirmSignUp from './containers/confirm-sign-up/ConfirmSignUp';

const Routes = () => (
  <React.Fragment>
    <Route exact path="/" component={Home} />
    <ProtectedRoute exact path="/matches" component={Home} />
    <Route exact path="/login" component={Home} />
    <Route exact path="/logout" component={Logout} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/confirm-signup/:token" component={ConfirmSignUp} />
    <Route exact path="/forgot-password" component={ForgotPassword} />
    <Route exact path="/recover-password/:token" component={CreateNewPassword} />
    <Route exact path="/socialite/:provider" component={Socialite} />
  </React.Fragment>
);

export default Routes;
