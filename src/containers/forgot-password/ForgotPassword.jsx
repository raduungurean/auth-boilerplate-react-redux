import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { recoverPasswordRequest, resetState } from '../../actions/forgot-password';
import UnauthContainer from '../../components/UnauthContainer';
import useStyles from '../../styles/unauthStyles';
import { validateEmail } from '../../services/utils';
import FormLink from '../../components/FormLink';
import MySnackbar from '../../components/MySnackbar';

const ForgotPassword = ({
  errors,
  recoverPasswordRequestNow,
  history,
  requestInProgress,
  success,
  resetState,
}) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [open, setSnackBarOpen] = useState(false);
  const [messages, setMessages] = useState({});

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setMessages({});
    setSnackBarOpen(false);
  }

  useEffect(() => {
    if (success) {
      setMessages({ success: 'Successfully sent. Please check your mailbox!' });
      setSnackBarOpen(true);
      resetState();
    }
  }, [success, resetState]);

  useEffect(() => () => resetState(), [resetState]);

  useEffect(() => {
    if (validateEmail(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }, [email]);

  return (
    <UnauthContainer classes={classes} title="Forgot your password?" errorMessage="">
      <MySnackbar
        isOpen={open}
        messages={messages}
        variant="success"
        handleClose={handleClose}
      />
      <form className={classes.form} noValidate>
        <Grid container spacing={1} justify="center">
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
            <Button
              disabled={!validEmail || requestInProgress}
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                recoverPasswordRequestNow(email);
              }}
              className={classes.submit}
            >
                Recover your password
            </Button>
          </Grid>
          <Grid item>
            <FormLink
              linkText="Go back to sign in page"
              onClick={() => history.push('/')}
              classLink={classes.linkScreen}
            />
          </Grid>
        </Grid>
      </form>
    </UnauthContainer>
  );
};

ForgotPassword.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  recoverPasswordRequestNow: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
  requestInProgress: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    requestInProgress: state.forgotPassword.requestInProgress,
    success: state.forgotPassword.success,
    errors: state.errors.errors['forgot-password'] ? state.errors.errors['forgot-password'] : {},
  };
}

export default connect(
  mapStateToProps, {
    recoverPasswordRequestNow: recoverPasswordRequest,
    resetState,
  },
)(withRouter(ForgotPassword));
