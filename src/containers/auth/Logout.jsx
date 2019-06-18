import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

class Logout extends React.Component {
  componentWillMount() {
    const { logoutUser, history } = this.props;

    logoutUser();
    history.push('/');
  }

  render() {
    return null;
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

function mapStateToProps(state) {
  return {};
}

export default withRouter(connect(
  mapStateToProps, {
    logoutUser: logout,
  },
)(Logout));
