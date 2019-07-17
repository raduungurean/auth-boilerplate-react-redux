import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { login, resetState } from '../../actions/auth';
import config from '../../config';
import UnauthContainer from '../../components/UnauthContainer';
import useStyles from '../../styles/unauthStyles';
import FormLink from '../../components/FormLink';
import MySnackbar from '../../components/MySnackbar';
import { resetErrorsForScreen } from '../../actions/errors';

const SignIn = (props) => {
  const { requestInProgress, errors, resetErrorsForScreen } = props;
  const [open, setSnackBarOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setSnackBarOpen(true);
    }
  }, [errors]);

  useEffect(() => () => resetErrorsForScreen('sign-in'), [resetErrorsForScreen]);

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  }

  return (
    <UnauthContainer title="Sign In" classes={classes} errorMessage="">
      <MySnackbar
        isOpen={open}
        messages={errors}
        variant="error"
        handleClose={handleClose}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.login(username, password);
        }}
        className={classes.form}
      >
        <Grid container spacing={1} style={{ marginTop: 10 }}>
          <Grid item xs={12}>
            <TextField
              label="Email address"
              id="username"
              name="username"
              autoComplete="username"
              value={username}
              autoFocus
              fullWidth
              variant="outlined"
              onChange={ev => setUsername(ev.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="password"
              id="password"
              variant="outlined"
              fullWidth
              autoComplete="current-password"
              onChange={ev => setPassword(ev.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              disabled={requestInProgress}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
            Sign in
            </Button>
          </Grid>
          <Grid item xs={6}>
            <FacebookLoginButton
              onClick={() => {
                const oauthRedirectURL = config
                  .OAUTH_REDIRECT_URL
                  .replace(':provider', 'facebook');
                window.location.assign(oauthRedirectURL);
              }}
              text="Sign In"
              iconSize="16"
              className={classes.socialButton}
              style={{
                fontSize: 14,
                height: 35,
                margin: 0,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <GoogleLoginButton
              onClick={() => {
                const oauthRedirectURL = config
                  .OAUTH_REDIRECT_URL
                  .replace(':provider', 'google');
                window.location.assign(oauthRedirectURL);
              }}
              className={classes.socialButton}
              text="Sign In"
              iconSize="16"
              style={{
                fontSize: 14,
                height: 35,
                margin: 0,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormLink
              linkText="Sign up now!"
              onClick={() => {
                props.history.push('/register');
              }}
              classLink={classes.linkScreen}
              firstText="You don't have an account?"
            />
          </Grid>
          <Grid item xs={12}>
            <FormLink
              linkText="Forgot Password?"
              onClick={() => {
                props.history.push('/forgot-password');
              }}
              classLink={classes.linkScreen}
            />
          </Grid>
        </Grid>
      </form>
    </UnauthContainer>
  );
};

SignIn.propTypes = {
  requestInProgress: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

function mapStateToProps(state) {
  return {
    requestInProgress: state.auth.requestInProgress,
    errors: state.errors.errors['sign-in'] ? state.errors.errors['sign-in'] : {},
  };
}

export default withRouter(connect(
  mapStateToProps, {
    login,
    resetErrorsForScreen,
    resetState,
  },
)(SignIn));
