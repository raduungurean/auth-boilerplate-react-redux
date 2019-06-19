import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MySnackbar from '../components/MySnackbar';
import { isObject } from '../services/utils';

const Notifications = ({
  forgotPasswordSuccessSent,
  forgotPasswordErrorNotSent,
  singInErrorMessage,
  signUpError,
  signUpSuccess,
}) => {
  let isOpen = false;
  let message = '';
  let variant = 'success';

  if (forgotPasswordSuccessSent) {
    isOpen = true;
    message = 'We\'ve sent you an email.';
    variant = 'success';
  } else if (forgotPasswordErrorNotSent) {
    isOpen = true;
    message = 'There was an error sending the email.';
    variant = 'error';
  } else if (singInErrorMessage) {
    isOpen = true;
    message = 'Wrong username or password.';
    variant = 'error';
  } else if (signUpError) {
    isOpen = true;
    message = 'Sign up error.';
    variant = 'error';
  } else if (signUpSuccess) {
    isOpen = true;
    message = 'We\'ve sent you an email.';
    variant = 'success';
  }

  if (isOpen) {
    return <MySnackbar variant={variant} isOpen={isOpen} message={message} />;
  }

  return null;
};

Notifications.propTypes = {
  forgotPasswordSuccessSent: PropTypes.bool.isRequired,
  forgotPasswordErrorNotSent: PropTypes.bool.isRequired,
  singInErrorMessage: PropTypes.bool.isRequired,
  signUpError: PropTypes.bool.isRequired,
  signUpSuccess: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    forgotPasswordSuccessSent: state.forgotPassword.success,
    forgotPasswordErrorNotSent: state.forgotPassword.errors.length > 0,
    singInErrorMessage: !!state.auth.errorMessage,
    signUpError: !!isObject(state.signUp.errors),
    signUpSuccess: state.signUp.registered,
  };
}

export default connect(
  mapStateToProps,
)(Notifications);
