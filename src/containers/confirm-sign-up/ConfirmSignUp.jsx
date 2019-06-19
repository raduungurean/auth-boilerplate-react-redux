import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import Link from '@material-ui/core/Link';
import { Typography } from '@material-ui/core';
import UnauthContainer from '../../components/UnauthContainer';
import useStyles from '../../styles/unauthStyles';
import { confirmSignUp } from '../../actions/confirm-sign-up';
import FormLink from '../../components/FormLink';

const ConfirmSignUp = ({
  requestInProgress, confirmSignUpNow, match, confirmed, history
}) => {
  const classes = useStyles();
  const { token } = match.params;

  useEffect(() => {
    confirmSignUpNow(token);
  }, [token, confirmSignUpNow]);

  if (requestInProgress) {
    return (
      <UnauthContainer title="" classes={classes} errorMessage="">
        <BarLoader height={4} width={100} />
      </UnauthContainer>
    );
  }

  return (
    <UnauthContainer showIcon={false} classes={classes} errorMessage="">
      {confirmed && (
      <Typography component="h4">
        Successfully Confirmed. Click
        {' '}
        <Link style={{ fontWeight: 'bold' }} onClick={() => history.push('/')}>here</Link>
        {' '}
        to sign in.
      </Typography>
      ) }
      {!confirmed && (
      <FormLink
        linkText="Go back to sign in!"
        onClick={() => history.push('/')}
        classLink={classes.linkScreen}
      />
      )}
    </UnauthContainer>
  );
};

ConfirmSignUp.propTypes = {
  requestInProgress: PropTypes.bool.isRequired,
  confirmed: PropTypes.bool.isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({ token: PropTypes.string }) }).isRequired,
  confirmSignUpNow: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

function mapStateToProps(state) {
  return {
    requestInProgress: state.confirmSignUp.requestInProgress,
    confirmed: state.confirmSignUp.confirmed,
  };
}

export default withRouter(connect(
  mapStateToProps, {
    confirmSignUpNow: confirmSignUp,
  },
)(ConfirmSignUp));
