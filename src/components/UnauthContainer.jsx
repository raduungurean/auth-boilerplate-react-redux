import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { Soccer } from 'mdi-material-ui';
import Typography from '@material-ui/core/Typography';

const UnauthContainer = ({
  title, classes, children, errorMessage, showIcon,
}) => (
  <Container component="main" maxWidth="xs">
    <div className={classes.paper}>
      {showIcon && <Soccer style={{ fontSize: 1 }} />}
      <Typography component="h1" variant="h4" style={{ padding: 10 }}>
        {title}
      </Typography>
      {errorMessage && <Typography component="h5" style={{ color: 'rgba(203,28,24,0.82)' }}>{errorMessage}</Typography>}
      {children}
    </div>
  </Container>
);

UnauthContainer.defaultProps = {
  errorMessage: undefined,
  title: '',
  showIcon: true,
};

UnauthContainer.propTypes = {
  title: PropTypes.string,
  showIcon: PropTypes.bool,
  classes: PropTypes.shape({}).isRequired,
  errorMessage: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default UnauthContainer;
