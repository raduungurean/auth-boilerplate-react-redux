import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UnauthContainer from '../../components/UnauthContainer';
import useStyles from '../../styles/unauthStyles';
import { checkCreateNewPasswordToken, createNewPassword } from '../../actions/create-new-password';

const CreateNewPassword = ({
  match,
  checkCreateNewPasswordTokenNow,
  checkingTokenRequestInProgress,
  valid,
  errors,
  createNewPasswordNow,
  creatingPasswordRequestInProgress,
}) => {
  const classes = useStyles();

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [validForm, setValidForm] = useState(false);
  const { token } = match.params;

  useEffect(() => {
    checkCreateNewPasswordTokenNow(token);
  }, [token, checkCreateNewPasswordTokenNow]);

  useEffect(() => {
    if (password
      && password.length >= 5
      && passwordConfirmation
      && (password === passwordConfirmation)
    ) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [password, passwordConfirmation]);

  if (!token) {
    return null;
  }

  if (checkingTokenRequestInProgress) {
    return (
      <UnauthContainer title="" classes={classes} errorMessage="">
        <BarLoader height={4} width={100} />
      </UnauthContainer>
    );
  }

  return (
    <UnauthContainer classes={classes} title="Set your new password" errorMessage={!valid ? 'Invalid token.' : ''}>
      {valid && (
      <form className={classes.form} noValidate>
        <Grid container spacing={1}>
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
          <Button
            disabled={!validForm || creatingPasswordRequestInProgress}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              createNewPasswordNow(password, passwordConfirmation, token);
            }}
            className={classes.submit}
          >
            Change your password
          </Button>
        </Grid>
      </form>
      ) }
    </UnauthContainer>
  );
};

CreateNewPassword.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ token: PropTypes.string }) }).isRequired,
  checkCreateNewPasswordTokenNow: PropTypes.func.isRequired,
  checkingTokenRequestInProgress: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  creatingPasswordRequestInProgress: PropTypes.bool.isRequired,
  createNewPasswordNow: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    checkingTokenRequestInProgress: state.createNewPassword.checkingTokenRequestInProgress,
    valid: state.createNewPassword.valid,
    errors: state.errors.errors['create-new-password'] ? state.errors.errors['create-new-password'] : {},
    creatingPasswordRequestInProgress: state.createNewPassword.creatingPasswordRequestInProgress,
    successfullyCreated: state.createNewPassword.successfullyCreated,
  };
}

export default connect(
  mapStateToProps, {
    checkCreateNewPasswordTokenNow: checkCreateNewPasswordToken,
    createNewPasswordNow: createNewPassword,
  },
)(withRouter(CreateNewPassword));
