import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import Box from '@material-ui/core/Box';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { login } from '../../actions/auth';
import config from '../../config';
import UnauthContainer from '../../components/UnauthContainer';
import useStyles from '../../styles/unauthStyles';
import FormLink from '../../components/FormLink';

const SignIn = (props) => {
  const { requestInProgress, errorMessage } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  return (
    <UnauthContainer title="Sign In" classes={classes} errorMessage={errorMessage}>
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
  errorMessage: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

function mapStateToProps(state) {
  return {
    requestInProgress: state.auth.requestInProgress,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(
  mapStateToProps, {
    login,
  },
)(SignIn));
