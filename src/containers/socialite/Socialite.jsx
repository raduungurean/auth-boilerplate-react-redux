import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { socialiteLogin } from '../../actions/auth';

const Socialite = ({
  authUser, location, socialiteLoginDo, match,
}) => {
  useEffect(() => {
    if (!authUser && location.search) {
      socialiteLoginDo(location.search, match.params.provider);
    }
  }, [authUser, location, socialiteLoginDo, match]);

  if (!authUser) {
    return <p>loading ...</p>;
  }
  return <Redirect to="/" />;
};

Socialite.defaultProps = {
  authUser: null,
};

Socialite.propTypes = {
  authUser: PropTypes.shape({}),
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  socialiteLoginDo: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      provider: PropTypes.string,
    }),
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    authUser: state.auth.user,
  };
}

export default connect(
  mapStateToProps, {
    socialiteLoginDo: socialiteLogin,
  },
)(Socialite);
