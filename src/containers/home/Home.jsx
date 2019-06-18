import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from '../auth/SignIn';

const Home = ({ authUser }) => (
  <React.Fragment>
    {!authUser && <LoginForm />}
    {authUser && (
      <p>
        Welcome
        {' '}
        {authUser.first_name}
        {' '}
        {authUser.last_name}
        .
      </p>
    )}
  </React.Fragment>
);

Home.defaultProps = {
  authUser: null,
};

Home.propTypes = {
  authUser: PropTypes.shape(
    { first_name: PropTypes.string, last_name: PropTypes.string },
  ),
};

function mapStateToProps(state) {
  return {
    authUser: state.auth.user,
  };
}

export default connect(
  mapStateToProps, {

  },
)(Home);
