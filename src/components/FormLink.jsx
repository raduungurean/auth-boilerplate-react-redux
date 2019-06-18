import React from 'react';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

const FormLink = ({
  firstText, linkText, classLink, onClick,
}) => (
  <Box component="div" style={{ textAlign: 'center', marginTop: 10 }}>
    {firstText && <Typography component="span">{firstText}</Typography> }
    <Link
      color="secondary"
      className={classLink}
      onClick={onClick}
    >
      {' '}
      {linkText}
    </Link>
  </Box>
);

FormLink.defaultProps = {
  firstText: undefined,
};

FormLink.propTypes = {
  firstText: PropTypes.string,
  linkText: PropTypes.string.isRequired,
  classLink: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FormLink;
