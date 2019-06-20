import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { validateEmail } from '../../services/utils';
import { signUp } from '../../actions/sign-up';
import UnauthContainer from '../../components/UnauthContainer';
import useStyles from '../../styles/unauthStyles';
import FormLink from '../../components/FormLink';
import MySnackbar from '../../components/MySnackbar';
import { resetErrorsForScreen } from '../../actions/errors';

const SignUp = ({
  errors,
  requestInProgress,
  registrationError,
  signUp,
  history,
  resetErrorsForScreen,
}) => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [valid, setValid] = useState(false);

  const [open, setSnackBarOpen] = useState(false);

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  }

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setSnackBarOpen(true);
    }
  }, [errors]);

  useEffect(() => () => resetErrorsForScreen('sign-up'), [resetErrorsForScreen]);

  useEffect(() => {
    if (firstName
        && firstName.length > 1
        && lastName
        && lastName.length > 1
        && email
        && password
        && password.length >= 5
        && passwordConfirmation
        && (password === passwordConfirmation)
        && validateEmail(email)
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [firstName, lastName, email, password, passwordConfirmation]);

  return (
    <UnauthContainer classes={classes} title="Sign Up" errorMessage={registrationError}>
      <MySnackbar
        isOpen={open}
        messages={errors}
        variant="error"
        handleClose={handleClose}
      />
      <form className={classes.form} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="first_name"
              variant="outlined"
              required
              fullWidth
              id="first_name"
              label="First Name"
              autoFocus
              value={firstName}
              InputLabelProps={{
                className: !errors.first_name ? null : classes.errorField,
              }}
              onChange={e => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="last_name"
              label="Last Name"
              name="fullWidth"
              value={lastName}
              InputLabelProps={{
                className: !errors.last_name ? null : classes.errorField,
              }}
              onChange={e => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              InputLabelProps={{
                className: !errors.email ? null : classes.errorField,
              }}
              onChange={e => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              InputLabelProps={{
                className: !errors.password ? null : classes.errorField,
              }}
              onChange={e => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password_confirmation"
              label="Password Confirmation"
              type="password"
              id="password_confirmation"
              value={passwordConfirmation}
              InputLabelProps={{
                className: !errors.password_confirmation ? null : classes.errorField,
              }}
              onChange={e => setPasswordConfirmation(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          disabled={!valid || requestInProgress}
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            signUp({
              first_name: firstName,
              last_name: lastName,
              email,
              password,
              password_confirmation: passwordConfirmation,
            });
          }}
          className={classes.submit}
        >
          {!requestInProgress ? 'Sign Up' : 'Signing Up ...'}
        </Button>
        <Grid container justify="center">
          <Grid item>
            <FormLink
              firstText="Already have an account?"
              linkText="Sign in"
              onClick={() => history.push('/')}
              classLink={classes.linkScreen}
            />
          </Grid>
        </Grid>
      </form>
    </UnauthContainer>
  );
};

SignUp.defaultProps = {
  registrationError: undefined,
};

SignUp.propTypes = {
  registrationError: PropTypes.string,
  requestInProgress: PropTypes.bool.isRequired,
  signUp: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

function mapStateToProps(state) {
  return {
    requestInProgress: state.signUp.requestInProgress,
    registrationError: state.signUp.registrationError,
    errors: state.errors.errors['sign-up'] ? state.errors.errors['sign-up'] : {},
  };
}

export default connect(
  mapStateToProps, {
    signUp,
    resetErrorsForScreen,
  },
)(withRouter(SignUp));
